import { useEffect, useState } from "react";
import UserPage from "../UserPage/UserPage";
import "./About.css";
import Shimmer from "../Shimmer/Shimmer";

interface GitHubUser {
    name: string;
    login: string;
    avatar_url: string;
    html_url: string;
}

const About = () => {
    const [user, setUser] = useState<GitHubUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`https://api.github.com/users/ansh30a`);
            const data: GitHubUser = await res.json();
            setUser(data);
        };

        fetchUser();
    }, []);

    if (!user) return <Shimmer />;

    return (
        <div>
            <UserPage name={user.name} username={user.login} avatar_url={user.avatar_url} github_link={user.html_url} />
        </div>
    );
};

export default About;
