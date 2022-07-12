import { register, start as coreStart, use, set, PluginEvent } from '@satumjs/core';
import { toArray, multipleRun, noop } from '@satumjs/utils';
import { simpleSandboxMidware, mountNodeMidware } from '@satumjs/simple-midwares';
import singleSpaMidware from '@satumjs/midware-single-spa';
import { RegistrableApp, LifeCycles, Options } from './type';

use(singleSpaMidware);
use(mountNodeMidware);

function registerMicroApps(apps: RegistrableApp[], lifeCycles?: LifeCycles) {
  register(apps);
  if (lifeCycles) {
    set((sys) => {
      const { beforeLoad, beforeMount, afterMount, beforeUnmount, afterUnmount } = lifeCycles;
      if (beforeLoad) sys.event(PluginEvent.beforeLoad, (customProps) => multipleRun<any, any>(toArray(beforeLoad), customProps));
      if (beforeMount)
        sys.event(PluginEvent.beforeMount, (customProps) => {
          // TODO: 这两个方法需传递，待实现...占位先
          customProps.onGlobalStateChange = noop;
          customProps.setGlobalState = noop;

          multipleRun<any, any>(toArray(beforeMount), customProps);
        });
      if (afterMount) sys.event(PluginEvent.afterMount, (customProps) => multipleRun<any, any>(toArray(afterMount), customProps));
      if (beforeUnmount) sys.event(PluginEvent.beforeUnmount, (customProps) => multipleRun<any, any>(toArray(beforeUnmount), customProps));
      if (afterUnmount) sys.event(PluginEvent.afterUnmount, (customProps) => multipleRun<any, any>(toArray(afterUnmount), customProps));
    });
  }
}

function start(opts?: Options) {
  const { sandbox = true, singular, excludeAssetFilter, ...restOptions } = opts || {};
  const qiankunFlag = '__POWERED_BY_QIANKUN__';
  const qiankunPublicFlag = '__INJECTED_PUBLIC_PATH_BY_QIANKUN__';
  if (sandbox) {
    use(simpleSandboxMidware, {
      winVariable(k: string, fakeWin: any) {
        if (k === qiankunFlag) return true;
        if (k === qiankunPublicFlag) return fakeWin.assetPublicPath;
        return;
      },
    });
  } else {
    window[qiankunFlag] = true;
  }
  coreStart(restOptions as any);
}

function initGlobalState() {
  // TODO: 这两个方法待实现，先占位
  return { onGlobalStateChange() {}, setGlobalState() {} };
}

function setDefaultMountApp(path: string) {
  const currentPath = location.pathname;
  if (!currentPath || currentPath === '/') {
    history.pushState(null, '', path);
  }
}

// TODO: 这个方法待实现，先占位
function runAfterFirstMounted(callback: Function) {
  if (typeof callback === 'function') callback();
}

// TODO: 这些方法待实现，先占位
function loadMicroApp() {}
function prefetchApps() {}
function addGlobalUncaughtErrorHandler() {}
function removeGlobalUncaughtErrorHandler() {}

export {
  registerMicroApps,
  start,
  initGlobalState,
  setDefaultMountApp,
  runAfterFirstMounted,
  loadMicroApp,
  prefetchApps,
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler,
};
