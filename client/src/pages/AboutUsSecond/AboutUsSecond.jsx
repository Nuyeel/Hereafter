import { useContext, useEffect } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import { Link } from 'react-router-dom';
import NameCard from './components/NameCard';
import './StyleSecond.scss';
//svg
import { ReactComponent as Pagearrow } from './imgs/pagearrow.svg';
//data
import info from './data/info.json';
import Chat from '../../components/Chat/Chat';

// import ChatTwo from '../../components/Chat/ChatTwo';
function AboutUsSecond(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    return (
        <>
            <div className="container">
                {/* <Chat /> */}
                <div className="ab-bg-sec ">
                    <Link to="/aboutusthird">
                        <Pagearrow className="ab-page-arrow" />
                    </Link>
                    <div className="ab-box-wrap">
                        {info.cards.map((v, i) => {
                            return <NameCard key={v.id} card={v} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default AboutUsSecond;
