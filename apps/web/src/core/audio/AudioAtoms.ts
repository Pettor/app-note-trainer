import { atomWithStorage } from "jotai/utils";

export const audioEnabledAtom = atomWithStorage<boolean>("audio-enabled", true);
