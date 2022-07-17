// FIXME: Genie 素材要修正到底部沒有留白

// Genie-01
import { ReactComponent as Genie01 } from '../images/Genie/genie-01.svg';

// TODO: 根據 props 決定 render 哪一隻
function Genie() {
    return (
        <>
            <Genie01 className="genie" />
        </>
    );
}

export default Genie;
