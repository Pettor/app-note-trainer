import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./MusicGlyph-BAoKmW0K.js";function a(){let e=[`gClef`,`fClef`,`noteheadWhole`,`noteheadHalf`,`noteheadBlack`,`accidentalSharp`,`accidentalFlat`,`accidentalNatural`],t={gClef:`G Clef`,fClef:`F Clef`,noteheadWhole:`Whole`,noteheadHalf:`Half`,noteheadBlack:`Quarter`,accidentalSharp:`Sharp`,accidentalFlat:`Flat`,accidentalNatural:`Natural`};return(0,s.jsx)(`div`,{className:`flex flex-wrap items-end gap-8 p-4`,children:e.map(e=>(0,s.jsxs)(`div`,{className:`flex flex-col items-center gap-2`,children:[(0,s.jsx)(n,{glyph:e,size:64}),(0,s.jsx)(`span`,{className:`text-foreground-500 text-xs`,children:t[e]})]},e))})}function o(){return(0,s.jsx)(`div`,{className:`flex flex-col gap-4 p-4`,children:[24,32,48,64,96].map(e=>(0,s.jsxs)(`div`,{className:`flex items-center gap-6`,children:[(0,s.jsxs)(`span`,{className:`text-foreground-500 w-10 text-xs`,children:[e,`px`]}),(0,s.jsx)(n,{glyph:`gClef`,size:e}),(0,s.jsx)(n,{glyph:`fClef`,size:e}),(0,s.jsx)(n,{glyph:`noteheadWhole`,size:e}),(0,s.jsx)(n,{glyph:`noteheadHalf`,size:e}),(0,s.jsx)(n,{glyph:`noteheadBlack`,size:e})]},e))})}var s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{r(),s=t(),c={component:n,title:`Display/Music Glyph`,tags:[`autodocs`],argTypes:{glyph:{control:`select`,options:Object.keys(i)},size:{control:{type:`range`,min:16,max:128,step:8}}},parameters:{layout:`padded`}},l={args:{glyph:`gClef`,size:64}},u={args:{glyph:`fClef`,size:64}},d={args:{glyph:`noteheadWhole`,size:64}},f={args:{glyph:`noteheadHalf`,size:64}},p={args:{glyph:`noteheadBlack`,size:64}},m={render:()=>(0,s.jsx)(a,{})},h={render:()=>(0,s.jsx)(o,{})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    glyph: "gClef",
    size: 64
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    glyph: "fClef",
    size: 64
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    glyph: "noteheadWhole",
    size: 64
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    glyph: "noteheadHalf",
    size: 64
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    glyph: "noteheadBlack",
    size: 64
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <GlyphGalleryStory />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <SizeScaleStory />
}`,...h.parameters?.docs?.source}}},g=[`GClef`,`FClef`,`WholeNote`,`HalfNote`,`QuarterNote`,`Gallery`,`SizeScale`]})))()}_();export{u as FClef,l as GClef,m as Gallery,f as HalfNote,p as QuarterNote,h as SizeScale,d as WholeNote,g as __namedExportsOrder,c as default};