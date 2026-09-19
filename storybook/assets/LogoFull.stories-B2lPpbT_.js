import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./LogoFull-DHItjFPe.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,title:`Shared/Branding/Logo/Full`,tags:[`autodocs`]},a={args:{appName:`Note Trainer`,size:`small`},play:async({canvas:e})=>{await r(e.getByText(`Note Trainer`)).toBeInTheDocument()}},o={args:{appName:`Note Trainer`,size:`medium`},play:async({canvas:e})=>{await r(e.getByText(`Note Trainer`)).toBeInTheDocument()}},s={args:{appName:`Note Trainer`,size:`large`},play:async({canvas:e})=>{await r(e.getByText(`Note Trainer`)).toBeInTheDocument()}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "Note Trainer",
    size: "small"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "Note Trainer",
    size: "medium"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    appName: "Note Trainer",
    size: "large"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByText("Note Trainer")).toBeInTheDocument();
  }
}`,...s.parameters?.docs?.source}}},c=[`FullSmall`,`FullMedium`,`FullLarge`]})))()}l();export{s as FullLarge,o as FullMedium,a as FullSmall,c as __namedExportsOrder,i as default};