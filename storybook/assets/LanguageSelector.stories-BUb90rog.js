import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./LanguageSelector-BQ_iu6v1.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),r={component:n,title:`Actions/Language Selector`,tags:[`autodocs`]},i={mode:`en`,onSelect:e=>console.log(`onSelect`,e)},a={args:i},o={args:{...i,mode:`sv`}},s={args:i,play:async({canvas:e,userEvent:t})=>{let n=e.getByRole(`radio`,{name:`Svenska`});await t.click(n)}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    mode: "sv"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas,
    userEvent
  }) => {
    const svenska = canvas.getByRole("radio", {
      name: "Svenska"
    });
    await userEvent.click(svenska);
  }
}`,...s.parameters?.docs?.source}}},c=[`English`,`Swedish`,`SelectSwedish`]})))()}l();export{a as English,s as SelectSwedish,o as Swedish,c as __namedExportsOrder,r as default};