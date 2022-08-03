import testpng from '../../../images/avatar/test1.png';
function Showcase() {
    return (
        <>
            <div className="container showcase">
                <p className="">投生形象1</p>
                <p>最後編輯時間:1234566124123446</p>
                <img src={testpng} alt="" width={300}></img>
                <p>組合文字</p>
                <p>總計價格</p>
            </div>
        </>
    );
}

export default Showcase;
