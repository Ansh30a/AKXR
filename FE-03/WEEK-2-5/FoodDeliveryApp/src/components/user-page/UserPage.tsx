import './UserPage.css';

interface User {
    name: string;
    username: string;
    avatar_url: string;
    github_link: string;
}

const UserPage = ({ name, username, avatar_url, github_link }: User) => {

    return (
        <div className="user-container">
            <div className='user-card'>
                <img src={avatar_url} alt="" />
                <h1>{name}</h1>
                <h2>{username}</h2>
                <h2><a href={github_link} target='_blank'>GitHub</a></h2>
            </div>
        </div>
    );
};

export default UserPage;
