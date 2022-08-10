import NameCard from './components/NameCard';
import info from './data/info.json';
import './StyleSecond.scss';
// import ChatTwo from '../../components/Chat/ChatTwo';
function AboutUsSecond() {
    return (
        <>
            <div className="container">
                <div className="header">投放所服務員</div>
                {/*<ChatTwo />*/}
                <div className="ab-bg-sec ">
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
