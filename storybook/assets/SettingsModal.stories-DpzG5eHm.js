import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./SettingsModal-BOcslJbj.js";var r,i,a,o,s,c,l,u,d;function f(){return(f=e((()=>{t(),r={component:n,title:`Feedback/Settings Modal`,parameters:{layout:`fullscreen`}},i={isOpen:!0,sections:[`account`,`appearance`,`language`,`about`],onClose:()=>console.log(`onClose`),account:{name:`John Doe`,email:`john.doe@example.com`},appearance:{themeSelector:{mode:`auto`,onSelect:e=>console.log(`onSelect`,e)}},language:{languageSelector:{mode:`en`,onSelect:e=>console.log(`onSelect`,e)}},aboutDetails:{appName:`Note Trainer`,appVersion:`1.0.0`,serverVersion:`2.0.0`}},a={args:i},o={args:{...i,initialSection:`account`}},s={args:{...i,initialSection:`appearance`}},c={args:{...i,initialSection:`language`}},l={args:{...i,initialSection:`about`}},u={args:i,globals:{viewport:{value:`iphonex`}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "account"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "appearance"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "language"
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    initialSection: "about"
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Account`,`Appearance`,`Language`,`About`,`Phone`]})))()}f();export{l as About,o as Account,s as Appearance,a as Default,c as Language,u as Phone,d as __namedExportsOrder,r as default};