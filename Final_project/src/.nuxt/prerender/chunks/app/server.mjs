import { getCurrentInstance, version, reactive, h, isReadonly, useSSRContext, createApp, toRef, isRef, provide, onErrorCaptured, onServerPrefetch, unref, inject, mergeProps, defineAsyncComponent } from 'file:///Users/andrejslocik/Downloads/Temporary/final_project/Final_project/node_modules/vue/index.mjs';
import { $fetch } from 'file:///Users/andrejslocik/node_modules/ofetch/dist/node.mjs';
import { createHooks } from 'file:///Users/andrejslocik/node_modules/hookable/dist/index.mjs';
import { getContext } from 'file:///Users/andrejslocik/node_modules/unctx/dist/index.mjs';
import { useHead, createHead as createHead$1 } from 'file:///Users/andrejslocik/node_modules/@unhead/vue/dist/index.mjs';
import { renderDOMHead, debouncedRenderDOMHead } from 'file:///Users/andrejslocik/node_modules/@unhead/dom/dist/index.mjs';
import { renderSSRHead } from 'file:///Users/andrejslocik/node_modules/@unhead/ssr/dist/index.mjs';
import { hasProtocol, parseURL, joinURL, isEqual, stringifyParsedURL, stringifyQuery, parseQuery } from 'file:///Users/andrejslocik/node_modules/ufo/dist/index.mjs';
import { createError as createError$1, sendRedirect } from 'file:///Users/andrejslocik/node_modules/h3/dist/index.mjs';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'file:///Users/andrejslocik/Downloads/Temporary/final_project/Final_project/node_modules/vue/server-renderer/index.mjs';
import { u as useRuntimeConfig$1 } from '../nitro/config.mjs';
import 'file:///Users/andrejslocik/node_modules/destr/dist/index.mjs';
import 'file:///Users/andrejslocik/node_modules/scule/dist/index.mjs';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options2) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options2
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options2.ssrContext.runtimeConfig.public,
      app: options2.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options2.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop === "public") {
        return target.public;
      }
      return target[prop] ?? target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const components = {};
const components_plugin_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options2) {
      return unhead.push(input, options2);
    },
    addEntry(input, options2) {
      return unhead.push(input, options2);
    },
    addHeadObjs(input, options2) {
      return unhead.push(input, options2);
    },
    addReactiveEntry(input, options2) {
      const api = useHead(input, options2);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document, force) {
      if (force)
        renderDOMHead(unhead, { document });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const vueuse_head_plugin_tb9yHIVkE1 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        // resolves naming difference with NuxtMeta and @vueuse/head
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function setResponseStatus(code, message) {
  const event = useRequestEvent();
  if (event) {
    event.node.res.statusCode = code;
    if (message) {
      event.node.res.statusMessage = message;
    }
  }
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options2) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options2 == null ? void 0 : options2.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus((options2 == null ? void 0 : options2.redirectCode) || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options2 == null ? void 0 : options2.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options2 == null ? void 0 : options2.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options2 == null ? void 0 : options2.replace) ? router.replace(to) : router.push(to);
};
const globalMiddleware = [];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_OfzuydNi2k = defineNuxtPlugin((nuxtApp) => {
  const initialURL = nuxtApp.ssrContext.url;
  const routes = [];
  const hooks = {
    "navigate:before": [],
    "resolve:before": [],
    "navigate:after": [],
    error: []
  };
  const registerHook = (hook, guard) => {
    hooks[hook].push(guard);
    return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
  };
  useRuntimeConfig().app.baseURL;
  const route = reactive(getRouteFromPath(initialURL));
  async function handleNavigation(url, replace) {
    try {
      const to = getRouteFromPath(url);
      for (const middleware of hooks["navigate:before"]) {
        const result = await middleware(to, route);
        if (result === false || result instanceof Error) {
          return;
        }
        if (result) {
          return handleNavigation(result, true);
        }
      }
      for (const handler of hooks["resolve:before"]) {
        await handler(to, route);
      }
      Object.assign(route, to);
      if (false)
        ;
      for (const middleware of hooks["navigate:after"]) {
        await middleware(to, route);
      }
    } catch (err) {
      for (const handler of hooks.error) {
        await handler(err);
      }
    }
  }
  const router = {
    currentRoute: route,
    isReady: () => Promise.resolve(),
    // These options provide a similar API to vue-router but have no effect
    options: {},
    install: () => Promise.resolve(),
    // Navigation
    push: (url) => handleNavigation(url),
    replace: (url) => handleNavigation(url),
    back: () => window.history.go(-1),
    go: (delta) => window.history.go(delta),
    forward: () => window.history.go(1),
    // Guards
    beforeResolve: (guard) => registerHook("resolve:before", guard),
    beforeEach: (guard) => registerHook("navigate:before", guard),
    afterEach: (guard) => registerHook("navigate:after", guard),
    onError: (handler) => registerHook("error", handler),
    // Routes
    resolve: getRouteFromPath,
    addRoute: (parentName, route2) => {
      routes.push(route2);
    },
    getRoutes: () => routes,
    hasRoute: (name) => routes.some((route2) => route2.name === name),
    removeRoute: (name) => {
      const index = routes.findIndex((route2) => route2.name === name);
      if (index !== -1) {
        routes.splice(index, 1);
      }
    }
  };
  nuxtApp.vueApp.component("RouterLink", {
    functional: true,
    props: {
      to: String,
      custom: Boolean,
      replace: Boolean,
      // Not implemented
      activeClass: String,
      exactActiveClass: String,
      ariaCurrentValue: String
    },
    setup: (props, { slots }) => {
      const navigate = () => handleNavigation(props.to, props.replace);
      return () => {
        var _a;
        const route2 = router.resolve(props.to);
        return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
          e.preventDefault();
          return navigate();
        } }, slots);
      };
    }
  });
  nuxtApp._route = route;
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  const initialLayout = useState("_layout");
  nuxtApp.hooks.hookOnce("app:created", async () => {
    router.beforeEach(async (to, from) => {
      to.meta = reactive(to.meta || {});
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
      for (const middleware of middlewareEntries) {
        const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
        {
          if (result === false || result instanceof Error) {
            const error = result || createError$1({
              statusCode: 404,
              statusMessage: `Page Not Found: ${initialURL}`
            });
            return callWithNuxt(nuxtApp, showError, [error]);
          }
        }
        if (result || result === false) {
          return result;
        }
      }
    });
    router.afterEach(() => {
      delete nuxtApp._processingMiddleware;
    });
    await router.replace(initialURL);
    if (!isEqual(route.fullPath, initialURL)) {
      const event = await callWithNuxt(nuxtApp, useRequestEvent);
      const options2 = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
      await callWithNuxt(nuxtApp, navigateTo, [route.fullPath, options2]);
    }
  });
  return {
    provide: {
      route,
      router
    }
  };
});
const _plugins = [
  components_plugin_KR1HBZs4kY,
  vueuse_head_plugin_tb9yHIVkE1,
  router_OfzuydNi2k
];
const _imports_2 = "" + __buildAssetsURL("rock.d2011a36.png");
const _imports_1 = "" + __buildAssetsURL("paper.742616bc.png");
const _imports_0 = "" + __buildAssetsURL("scissors.33622a72.png");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  methods: {
    pRock() {
      this.$emit("getChoice", "rock");
    },
    pPaper() {
      this.$emit("getChoice", "paper");
    },
    pScissors() {
      this.$emit("getChoice", "scissors");
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><img${ssrRenderAttr("src", _imports_2)} alt="Rock" type="button"><img${ssrRenderAttr("src", _imports_1)} alt="Paper" type="button"><img${ssrRenderAttr("src", _imports_0)} alt="Scissors" type="button"></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Player.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const options = ["rock", "paper", "scissors"];
const _sfc_main$2 = {
  data() {
    return {
      option: ""
    };
  },
  //Random choosing of an item
  methods: {
    chooseRandom() {
      const randomChoice = Math.floor(Math.random() * options.length);
      this.option = options[randomChoice];
      this.$emit("getChoice", this.option);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-computer" }, _attrs))}><button id="play-btn">Choose an item and click here</button></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Computer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  name: "App",
  components: {
    Computer: __nuxt_component_1,
    Player: __nuxt_component_0
  },
  data() {
    return {
      player_choice: "",
      computer_choice: "",
      computer_score: "",
      player_score: "",
      winner: "",
      tie: "",
      rockImg: "rock.png",
      paperImg: "paper.png",
      scissorsImg: "scissors.png",
      currentState: ""
    };
  },
  methods: {
    //Updating choices
    updatePlayerChoice(option) {
      this.player_choice = option;
    },
    updateComputerChoice(option) {
      this.computer_choice = option;
    },
    //Comparison mechanism - Game logic
    play() {
      const { player_choice, computer_choice } = this;
      if (player_choice === computer_choice) {
        this.winner = "It's a tie!";
        this.tie++;
      } else if (computer_choice === "scissors" && player_choice === "paper" || computer_choice === "paper" && player_choice === "rock" || computer_choice === "rock" && player_choice === "scissors") {
        this.computer_score++;
        this.winner = "You lost!";
      } else if (player_choice === "") {
        alert("Select your item!");
      } else {
        this.player_score++;
        this.winner = "You won!";
      }
      if (this.player_score + 1 > this.computer_score + 1) {
        this.currentState = "You are winning!";
      } else if (this.player_score + 1 < this.computer_score + 1) {
        this.currentState = "You are loosing!";
      } else {
        this.currentState = "Now the score is equal!";
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Player = __nuxt_component_0;
  const _component_Computer = __nuxt_component_1;
  _push(`<!--[--><header><h1>Rock Paper Scissors</h1></header><div class="container"><div class="score_board"><h2>Scores:</h2><h3 class="score">You: ${ssrInterpolate($data.player_score)}</h3><h3 class="score">Computer: ${ssrInterpolate($data.computer_score)}</h3><h3 class="score">Ties: ${ssrInterpolate($data.tie)}</h3><h2 id="currentState">${ssrInterpolate($data.currentState)}</h2></div><div class="float-child"><div class="player"></div></div><div class="main"><div class="player-side">`);
  _push(ssrRenderComponent(_component_Player, {
    onGetChoice: ($event) => $options.updatePlayerChoice($event),
    option: $data.player_choice
  }, null, _parent));
  _push(`<h2>You chose: ${ssrInterpolate($data.player_choice)}</h2><div class="to-the-right">`);
  if ($data.player_choice === "rock") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.rockImg)} alt="rock">`);
  } else {
    _push(`<!---->`);
  }
  if ($data.player_choice === "paper") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.paperImg)} alt="paper">`);
  } else {
    _push(`<!---->`);
  }
  if ($data.player_choice === "scissors") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.scissorsImg)} alt="scissors">`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="computer-side"><img${ssrRenderAttr("src", _imports_0)} alt="Scissors" type="button"><img${ssrRenderAttr("src", _imports_1)} alt="Paper" type="button"><img${ssrRenderAttr("src", _imports_2)} alt="Rock" type="button"><br><h2>Computer chose: ${ssrInterpolate($data.computer_choice)}</h2>`);
  if ($data.computer_choice === "rock") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.rockImg)}>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.computer_choice === "paper") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.paperImg)}>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.computer_choice === "scissors") {
    _push(`<img${ssrRenderAttr("src", "../public/" + $data.scissorsImg)}>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="winner-section">`);
  if ($data.winner) {
    _push(`<h1 class="winner">${ssrInterpolate($data.winner)}</h1>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  _push(ssrRenderComponent(_component_Computer, {
    onClick: $options.play,
    onGetChoice: ($event) => $options.updateComputerChoice($event),
    option: $data.computer_choice
  }, null, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("App.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-757f8013.mjs').then((r) => r.default || r));
    const IslandRendererer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-b2d155f4.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRendererer), { context: unref(islandContext) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useNuxtApp as a, createError as c, entry$1 as default, navigateTo as n, useRouter as u };
//# sourceMappingURL=server.mjs.map
