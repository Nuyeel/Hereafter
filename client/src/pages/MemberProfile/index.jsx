import MemberProfileForm from './MemberProfileForm';

function MemberProfile(props) {
    const { pageName } = props;

    return <MemberProfileForm pageName={pageName} />;
}

export default MemberProfile;
