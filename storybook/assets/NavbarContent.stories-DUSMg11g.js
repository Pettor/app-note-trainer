import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./NavbarContent-CV7lHYyD.js";var r;function i(){return(i=e((()=>{r={onSettings:()=>console.log(`onSettings`)}})))()}var a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{t(),i(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:n,title:`Navigation/Navbar Content`,parameters:{layout:`fullscreen`}},s={...r},c={args:s},l={args:s,parameters:{viewport:{value:`full`}}},u={args:s,globals:{viewport:{value:`iphonex`}}},d={args:s,play:async({canvas:e})=>{let t=e.getByTestId(`home-page__settings-button`);await a(t).toBeInTheDocument()}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: defaultArgs
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    const settingsButton = canvas.getByTestId("home-page__settings-button");
    await expect(settingsButton).toBeInTheDocument();
  }
}`,...d.parameters?.docs?.source}}},f=[`Responsive`,`Desktop`,`Phone`,`Interaction`]})))()}p();export{l as Desktop,d as Interaction,u as Phone,c as Responsive,f as __namedExportsOrder,o as default};