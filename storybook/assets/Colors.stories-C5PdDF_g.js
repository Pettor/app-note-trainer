import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{_ as r,g as i,h as a,m as o,n as s,o as c,t as l}from"./src-B9dlKg5B.js";function u(e){let t=getComputedStyle(e).backgroundColor,n=document.createElement(`canvas`);n.width=1,n.height=1;let r=n.getContext(`2d`);if(!r)return`black`;r.fillStyle=getComputedStyle(document.documentElement).getPropertyValue(`--background`).trim()||`#ffffff`,r.fillRect(0,0,1,1),r.fillStyle=t,r.fillRect(0,0,1,1);let{data:i}=r.getImageData(0,0,1,1),a=i[0]??0,o=i[1]??0,s=i[2]??0;return(.2126*a+.7152*o+.0722*s)/255>.5?`black`:`white`}function d({title:e,children:t}){return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{className:`text-xl font-medium`,children:e}),(0,_.jsx)(`div`,{className:`h-2`}),(0,_.jsx)(`div`,{className:`flex h-full w-full flex-row flex-wrap items-center justify-start px-4 py-1`,children:t})]})}function f({text:e,bgColor:t}){let n=(0,g.useRef)(null),[r,a]=(0,g.useState)(`black`);return(0,g.useEffect)(()=>{function e(){n.current&&a(u(n.current))}e();let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`data-theme`]}),()=>t.disconnect()},[t]),(0,_.jsx)(o,{variant:`secondary`,ref:n,className:`m-2 h-15 w-35 ${t}`,children:(0,_.jsx)(i,{className:`items-center justify-center truncate text-xs`,style:{color:r},children:e})})}function p({text:e,style:t}){return(0,_.jsx)(`div`,{className:`m-2 flex h-15 w-35 items-center justify-center overflow-hidden rounded-xl`,style:t,children:(0,_.jsx)(`span`,{className:`truncate px-3 text-xs text-white`,children:e})})}function m(){return(0,_.jsx)(`div`,{className:`mx-6 my-3 h-3 rounded-full`,style:{background:`var(--brand-gradient)`}})}function h(){return(0,_.jsxs)(s,{label:`Colors`,children:[(0,_.jsx)(`div`,{className:`h-8`}),(0,_.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,_.jsxs)(d,{title:`Background & Surfaces`,children:[(0,_.jsx)(f,{text:`--background`,bgColor:`bg-background`}),(0,_.jsx)(f,{text:`--foreground`,bgColor:`bg-foreground`}),(0,_.jsx)(f,{text:`--surface`,bgColor:`bg-surface`}),(0,_.jsx)(f,{text:`--surface-foreground`,bgColor:`bg-surface-foreground`}),(0,_.jsx)(f,{text:`--surface-secondary`,bgColor:`bg-surface-secondary`}),(0,_.jsx)(f,{text:`--surface-secondary-fg`,bgColor:`bg-surface-secondary-foreground`}),(0,_.jsx)(f,{text:`--surface-tertiary`,bgColor:`bg-surface-tertiary`}),(0,_.jsx)(f,{text:`--surface-tertiary-fg`,bgColor:`bg-surface-tertiary-foreground`}),(0,_.jsx)(f,{text:`--overlay`,bgColor:`bg-overlay`}),(0,_.jsx)(f,{text:`--overlay-foreground`,bgColor:`bg-overlay-foreground`})]}),(0,_.jsxs)(d,{title:`Brand Colors`,children:[(0,_.jsx)(f,{text:`--accent`,bgColor:`bg-accent`}),(0,_.jsx)(f,{text:`--secondary`,bgColor:`bg-[var(--secondary)]`}),(0,_.jsx)(f,{text:`--accent-soft`,bgColor:`bg-accent-soft`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{className:`text-xl font-medium`,children:`Brand Gradient`}),(0,_.jsx)(`div`,{className:`h-2`}),(0,_.jsx)(m,{}),(0,_.jsxs)(`div`,{className:`flex flex-row flex-wrap items-center justify-start px-4 py-1`,children:[(0,_.jsx)(p,{text:`--brand-grad-1`,style:{background:`var(--brand-grad-1)`}}),(0,_.jsx)(p,{text:`--brand-grad-2`,style:{background:`var(--brand-grad-2)`}}),(0,_.jsx)(p,{text:`--brand-grad-3`,style:{background:`var(--brand-grad-3)`}}),(0,_.jsx)(p,{text:`--brand-gradient`,style:{background:`var(--brand-gradient)`,width:`9.5rem`}})]})]}),(0,_.jsxs)(d,{title:`Status Colors`,children:[(0,_.jsx)(f,{text:`--success`,bgColor:`bg-success`}),(0,_.jsx)(f,{text:`--success-foreground`,bgColor:`bg-success-foreground`}),(0,_.jsx)(f,{text:`--warning`,bgColor:`bg-warning`}),(0,_.jsx)(f,{text:`--warning-foreground`,bgColor:`bg-warning-foreground`}),(0,_.jsx)(f,{text:`--danger`,bgColor:`bg-danger`}),(0,_.jsx)(f,{text:`--danger-foreground`,bgColor:`bg-danger-foreground`})]}),(0,_.jsxs)(d,{title:`Form Field Colors`,children:[(0,_.jsx)(f,{text:`--field-background`,bgColor:`bg-field`}),(0,_.jsx)(f,{text:`--field-foreground`,bgColor:`bg-field-foreground`}),(0,_.jsx)(f,{text:`--field-placeholder`,bgColor:`bg-field-placeholder`}),(0,_.jsx)(f,{text:`--field-border`,bgColor:`bg-field-border`})]}),(0,_.jsxs)(d,{title:`Other Colors`,children:[(0,_.jsx)(f,{text:`--default`,bgColor:`bg-default`}),(0,_.jsx)(f,{text:`--default-foreground`,bgColor:`bg-default-foreground`}),(0,_.jsx)(f,{text:`--muted`,bgColor:`bg-muted`}),(0,_.jsx)(f,{text:`--border`,bgColor:`bg-border`}),(0,_.jsx)(f,{text:`--separator`,bgColor:`bg-separator`}),(0,_.jsx)(f,{text:`--focus`,bgColor:`bg-focus`}),(0,_.jsx)(f,{text:`--link`,bgColor:`bg-link`}),(0,_.jsx)(f,{text:`--backdrop`,bgColor:`bg-[var(--backdrop)]`}),(0,_.jsx)(f,{text:`--scrollbar`,bgColor:`bg-[var(--scrollbar)]`})]})]})]})}var g,_,v,y;function b(){return(b=e((()=>{g=t(),a(),r(),l(),_=n(),v={title:`Design System/Colors`,tags:[`no-tests`],decorators:[c],parameters:{a11y:{test:`off`},layout:`fullscreen`}},h.__docgenInfo={description:``,methods:[],displayName:`Colors`},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`function Colors(): ReactElement {
  return <DocumentationLayout label="Colors">
      <div className="h-8" />
      <div className="flex flex-col gap-4">
        <ColorSection title="Background & Surfaces">
          <ColorItem text="--background" bgColor="bg-background" />
          <ColorItem text="--foreground" bgColor="bg-foreground" />
          <ColorItem text="--surface" bgColor="bg-surface" />
          <ColorItem text="--surface-foreground" bgColor="bg-surface-foreground" />
          <ColorItem text="--surface-secondary" bgColor="bg-surface-secondary" />
          <ColorItem text="--surface-secondary-fg" bgColor="bg-surface-secondary-foreground" />
          <ColorItem text="--surface-tertiary" bgColor="bg-surface-tertiary" />
          <ColorItem text="--surface-tertiary-fg" bgColor="bg-surface-tertiary-foreground" />
          <ColorItem text="--overlay" bgColor="bg-overlay" />
          <ColorItem text="--overlay-foreground" bgColor="bg-overlay-foreground" />
        </ColorSection>

        <ColorSection title="Brand Colors">
          <ColorItem text="--accent" bgColor="bg-accent" />
          <ColorItem text="--secondary" bgColor="bg-[var(--secondary)]" />
          <ColorItem text="--accent-soft" bgColor="bg-accent-soft" />
        </ColorSection>

        <div>
          <p className="text-xl font-medium">Brand Gradient</p>
          <div className="h-2" />
          <GradientBar />
          <div className="flex flex-row flex-wrap items-center justify-start px-4 py-1">
            <GradientSwatch text="--brand-grad-1" style={{
            background: "var(--brand-grad-1)"
          }} />
            <GradientSwatch text="--brand-grad-2" style={{
            background: "var(--brand-grad-2)"
          }} />
            <GradientSwatch text="--brand-grad-3" style={{
            background: "var(--brand-grad-3)"
          }} />
            <GradientSwatch text="--brand-gradient" style={{
            background: "var(--brand-gradient)",
            width: "9.5rem"
          }} />
          </div>
        </div>

        <ColorSection title="Status Colors">
          <ColorItem text="--success" bgColor="bg-success" />
          <ColorItem text="--success-foreground" bgColor="bg-success-foreground" />
          <ColorItem text="--warning" bgColor="bg-warning" />
          <ColorItem text="--warning-foreground" bgColor="bg-warning-foreground" />
          <ColorItem text="--danger" bgColor="bg-danger" />
          <ColorItem text="--danger-foreground" bgColor="bg-danger-foreground" />
        </ColorSection>

        <ColorSection title="Form Field Colors">
          <ColorItem text="--field-background" bgColor="bg-field" />
          <ColorItem text="--field-foreground" bgColor="bg-field-foreground" />
          <ColorItem text="--field-placeholder" bgColor="bg-field-placeholder" />
          <ColorItem text="--field-border" bgColor="bg-field-border" />
        </ColorSection>

        <ColorSection title="Other Colors">
          <ColorItem text="--default" bgColor="bg-default" />
          <ColorItem text="--default-foreground" bgColor="bg-default-foreground" />
          <ColorItem text="--muted" bgColor="bg-muted" />
          <ColorItem text="--border" bgColor="bg-border" />
          <ColorItem text="--separator" bgColor="bg-separator" />
          <ColorItem text="--focus" bgColor="bg-focus" />
          <ColorItem text="--link" bgColor="bg-link" />
          <ColorItem text="--backdrop" bgColor="bg-[var(--backdrop)]" />
          <ColorItem text="--scrollbar" bgColor="bg-[var(--scrollbar)]" />
        </ColorSection>
      </div>
    </DocumentationLayout>;
}`,...h.parameters?.docs?.source}}},y=[`Colors`]})))()}b();export{h as Colors,y as __namedExportsOrder,v as default};