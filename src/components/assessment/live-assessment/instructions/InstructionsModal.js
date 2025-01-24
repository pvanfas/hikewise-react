import Modal from "components/shared/Modal";
import style from "./InstructionsModal.module.scss";

import { useEngine } from "../engine/EngineProvider";
import AptiSubcatInstructions from "./AptiSubcatInstructions";
import SectionInstructions from "./SectionInstructions";

export default function SectionInstructionsModal({ isOpen }) {
  const { state } = useEngine();
  let currContent = state.testData.contents[state.testData.currIndices[0]].content[state.testData.currIndices[1]];

  const { instructions } = currContent;

  return (
    isOpen && (
      <Modal contentClassName={style.wrapper} isOpen={isOpen}>
        {instructions.type === "SUBCAT_INSTRUCTIONS" && <AptiSubcatInstructions isModal={true} />}
        {instructions.type === "SEC_INSTRUCTIONS" && <SectionInstructions isModal={true} />}
      </Modal>
    )
  );
}
