import NameCard from './components/NameCard';
import info from './data/info.json';
import './StyleSecond.scss';
function AboutUsSecond() {
    return (
        <>
            <div class="container">
                <div className="header">投放所服務員</div>
                <div class="ab-bg-third ">
                    <div class="ab-box-wrap">
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
