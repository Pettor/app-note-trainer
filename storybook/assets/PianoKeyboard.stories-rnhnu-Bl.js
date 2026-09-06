import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./PianoKeyboard-wcgn3nqM.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{a=t(),r(),o=n(),{expect:s}=__STORYBOOK_MODULE_TEST__,c={component:i,title:`Input/Piano Keyboard`,tags:[`autodocs`],args:{onKeyPress:()=>{}},parameters:{layout:`padded`}},l={onKeyPress:()=>{}},u={},d={args:{highlightedKey:`C4`}},f={args:{highlightedKey:`F#4`}},p={args:{highlightedKey:`A5`}},m={parameters:{viewport:{value:`full`}}},h={globals:{viewport:{value:`iphonex`}}},g={args:{highlightedKey:`G4`},globals:{viewport:{value:`iphonex`}}},_={args:l,play:async({canvas:e})=>{await s(e.getByRole(`group`,{name:`Piano keyboard`})).toBeInTheDocument();let t=e.getAllByRole(`button`);await s(t).toHaveLength(24)}},v={render:()=>{let[e,t]=(0,a.useState)(null);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(i,{...l,onKeyPress:e=>t(e.label)}),(0,o.jsx)(`div`,{"data-testid":`piano-keyboard__result`,children:e??`none`})]})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`piano-keyboard__key-c4`)),await s(e.getByTestId(`piano-keyboard__result`)).toHaveTextContent(`C4`)}},y={render:()=>{let[e,t]=(0,a.useState)(null);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(i,{...l,onKeyPress:e=>t(e.label)}),(0,o.jsx)(`div`,{"data-testid":`piano-keyboard__result`,children:e??`none`})]})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`piano-keyboard__key-fsharp4`)),await s(e.getByTestId(`piano-keyboard__result`)).toHaveTextContent(`F#4`)}},b={render:()=>{let[e,t]=(0,a.useState)(null);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(i,{...l,onKeyPress:e=>t(`${e.note}|${e.octave}|${e.isBlack?`black`:`white`}`)}),(0,o.jsx)(`div`,{"data-testid":`piano-keyboard__result`,children:e??`none`})]})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`piano-keyboard__key-asharp5`)),await s(e.getByTestId(`piano-keyboard__result`)).toHaveTextContent(`A#|5|black`)}},x={args:{...l,highlightedKey:`C4`},play:async({canvas:e})=>{await s(e.getByTestId(`piano-keyboard__key-c4`)).toHaveAttribute(`data-highlighted`),await s(e.getByTestId(`piano-keyboard__key-d4`)).not.toHaveAttribute(`data-highlighted`),await s(e.getByTestId(`piano-keyboard__key-fsharp4`)).not.toHaveAttribute(`data-highlighted`)}},S={args:{...l,highlightedKey:`F#4`},play:async({canvas:e})=>{await s(e.getByTestId(`piano-keyboard__key-fsharp4`)).toHaveAttribute(`data-highlighted`),await s(e.getByTestId(`piano-keyboard__key-c4`)).not.toHaveAttribute(`data-highlighted`)}},C={render:()=>{let[e,t]=(0,a.useState)([]);return(0,o.jsxs)(`div`,{children:[(0,o.jsx)(i,{...l,onKeyPress:e=>t(t=>[...t,e.label])}),(0,o.jsx)(`div`,{"data-testid":`piano-keyboard__result`,children:e.join(`,`)||`none`})]})},play:async({canvas:e,userEvent:t})=>{await t.click(e.getByTestId(`piano-keyboard__key-c4`)),await t.click(e.getByTestId(`piano-keyboard__key-e4`)),await t.click(e.getByTestId(`piano-keyboard__key-g4`)),await s(e.getByTestId(`piano-keyboard__result`)).toHaveTextContent(`C4,E4,G4`)}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    highlightedKey: "C4"
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    highlightedKey: "F#4"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    highlightedKey: "A5"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      value: "full"
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    highlightedKey: "G4"
  },
  globals: {
    viewport: {
      value: "iphonex"
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: defaultArgs,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole("group", {
      name: "Piano keyboard"
    })).toBeInTheDocument();

    // 2 octaves = 14 white keys + 10 black keys = 24 buttons total
    const allKeys = canvas.getAllByRole("button");
    await expect(allKeys).toHaveLength(24);
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    return <div>
        <Component {...defaultArgs} onKeyPress={key => setLastKey(key.label)} />
        <div data-testid="piano-keyboard__result">{lastKey ?? "none"}</div>
      </div>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-c4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("C4");
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [lastKey, setLastKey] = useState<string | null>(null);
    return <div>
        <Component {...defaultArgs} onKeyPress={key => setLastKey(key.label)} />
        <div data-testid="piano-keyboard__result">{lastKey ?? "none"}</div>
      </div>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-fsharp4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("F#4");
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [result, setResult] = useState<string | null>(null);
    return <div>
        <Component {...defaultArgs} onKeyPress={key => setResult(\`\${key.note}|\${key.octave}|\${key.isBlack ? "black" : "white"}\`)} />
        <div data-testid="piano-keyboard__result">{result ?? "none"}</div>
      </div>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-asharp5"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("A#|5|black");
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    highlightedKey: "C4"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByTestId("piano-keyboard__key-c4")).toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-d4")).not.toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-fsharp4")).not.toHaveAttribute("data-highlighted");
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultArgs,
    highlightedKey: "F#4"
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByTestId("piano-keyboard__key-fsharp4")).toHaveAttribute("data-highlighted");
    await expect(canvas.getByTestId("piano-keyboard__key-c4")).not.toHaveAttribute("data-highlighted");
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [keys, setKeys] = useState<string[]>([]);
    return <div>
        <Component {...defaultArgs} onKeyPress={key => setKeys(prev => [...prev, key.label])} />
        <div data-testid="piano-keyboard__result">{keys.join(",") || "none"}</div>
      </div>;
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-c4"));
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-e4"));
    await userEvent.click(canvas.getByTestId("piano-keyboard__key-g4"));
    await expect(canvas.getByTestId("piano-keyboard__result")).toHaveTextContent("C4,E4,G4");
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`HighlightedWhiteKey`,`HighlightedBlackKey`,`HighlightedUpperOctave`,`Desktop`,`Phone`,`PhoneHighlighted`,`KeyboardRenders`,`PressWhiteKey`,`PressBlackKey`,`PressKeyReturnsNoteData`,`HighlightedKeyMarked`,`HighlightedBlackKeyMarked`,`MultipleKeyPresses`]})))()}T();export{u as Default,m as Desktop,f as HighlightedBlackKey,S as HighlightedBlackKeyMarked,x as HighlightedKeyMarked,p as HighlightedUpperOctave,d as HighlightedWhiteKey,_ as KeyboardRenders,C as MultipleKeyPresses,h as Phone,g as PhoneHighlighted,y as PressBlackKey,b as PressKeyReturnsNoteData,v as PressWhiteKey,w as __namedExportsOrder,c as default};