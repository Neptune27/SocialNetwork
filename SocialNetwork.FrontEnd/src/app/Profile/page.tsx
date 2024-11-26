"use client";
import React, { useEffect, useState } from "react";
import UserHeader from "@/components/header/header";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "@/components/createPost";
import GridPosts from "./GridPosts";
import CreatePostPopUp from "@/components/createPostPopUp";
import Post from "@/components/post";
import Photos from "./Photos";
import Link from "next/link";
import Friends from "./Friends";
import Intro from "../../components/intro";
import { authorizedFetch } from "../../Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "../../api/const";
import LoadMore from "../../components/profilePicture/LoadMore";
import useCurrentUser from "../../hooks/useCurrentUser";
import usePosts from "../../hooks/Posts/usePosts";
import Loading from "../../components/Loading";
import useUserId from "../../hooks/useUserId";
import { useSearchParams } from "next/navigation";
import PopupPostDialog from "../../components/post/PopupPostDialog";
import useNotificationHub from "../../hooks/useNotificationHub";
import useAuthorizeHub from "../../hooks/useAuthorizeHub";



interface Friendship {
    friends?: boolean;
    following?: boolean;
    requestSent?: boolean;
    requestReceived?: boolean;
}

interface UserProps {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface Comment {
    comment: string;
    commentBy: string;
    commentAt: Date;
}

interface PostUser {
    username: string;
    picture: string;
    first_name: string;
    last_name: string;
    gender: "male" | "female";
}

interface PostData {
    user: PostUser;
    type: "profilePicture" | "cover" | null;
    text: string;
    images: string[];
    background?: string; // Optional
    comments: Comment[];
    createdAt: string;
}

// Mock user data
const user: UserProps = {
    name: "Nguyen Huy",
    firstName: "Nguyen",
    lastName: "Huy",
    profilePicture: "/images/default_profile.png",
};

// Mock post data matching the Mongoose schema
const postVar: PostData = {
    user: {
        username: "johndoe",
        picture: "/images/default_profile.png",
        first_name: "John",
        last_name: "Doe",
        gender: "male",
    },
    type: "profilePicture",
    text: "This is a mock post description with multiple images.",
    images: ["/stories/1.jpg", "/stories/3.jpg"],
    background: "/images/postBackgrounds/1.jpg",
    comments: [
        {
            comment: "Great post!",
            commentBy: "user1",
            commentAt: new Date(),
        },
    ],
    createdAt: new Date().toISOString(),
};
const postVar1: PostData = {
    user: {
        username: "johndoe",
        picture: "/images/default_profile.png",
        first_name: "John",
        last_name: "Doe",
        gender: "male",
    },
    type: "profilePicture",
    text: "This is a mock post description with multiple images.",
    images: ["/stories/1.jpg", "/stories/3.jpg"],
    comments: [
        {
            comment: "Great post!",
            commentBy: "user1",
            commentAt: new Date(),
        },
    ],
    createdAt: new Date().toISOString(),
};

interface Details {
    bio: string;
    othername: string;
    job: string;
    workplace: string;
    highSchool: string;
    college: string;
    currentCity: string;
    hometown: string;
    relationship: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    background: string;
    username: string;
    location: string;
    twitter: string;
    instagram: string;
    github: string;
}



const ProfilePage = () => {
    const [visitor, setVisitor] = useState(false);
    const [visible, setVisible] = useState(false);
    const userId = useUserId();
    const userStore = useCurrentUser();
    const params = useSearchParams()

    const [posts, setPosts] = useState<PostData[]>([])
    const [profileId, setProfileId] = useState(userId)

    const [friendshipData, setFriendshipData] = useState<Friendship>({
        friends: false,
        following: false,
        requestSent: false,
        requestReceived: false,
    });




    const [details, setDetails] = useState<Details>({
        bio: "A passionate software developer",
        othername: "Nguyen Huy",
        job: "Software Engineer",
        workplace: "Tech Corp",
        highSchool: "Nguyen Huu Canh High",
        college: "Sai Gon University",
        currentCity: "Ho Chi Minh",
        hometown: "Quang Nam",
        relationship: "Single",
        firstName: "Test First Name H",
        lastName: "Test",
        profilePicture: "",
        background: "",
        username: "",
        location: "",
        twitter: "",
        instagram: "",
        github: "",
    });



    const notificationHub = useNotificationHub()

    useEffect(() => {

        if (notificationHub.hub) {
            return
        }

        const hub = useAuthorizeHub(`${api(ApiEndpoint.NOTIFICATION)}/hub`)
        notificationHub.set(hub)
    }, [])

    const handlePost = async (data: any) => {
        console.log(data)
        const post = posts.find(p => p.id == data.fromId)
        if (post == undefined) {
            return
        }
        const resp = await authorizedFetch(`${api(ApiEndpoint.POST)}/Comment/ByPost/${post.id}`)
        const newComments = await resp.json()
        console.log(newComments)
        const size = post.comments.length;
        post.comments.splice(0, size, ...newComments)
        setPosts([...posts])
    }

    useEffect(() => {
        if (notificationHub.hub == null) {
            return
        }

        const hub = notificationHub.hub
        hub.on("POST", handlePost)

        return () => {
            hub.off("POST", handlePost)
        }

    }, [notificationHub, handlePost])


    const getIsFriend = async (profileId: string) => {
        console.log("Khong co request, Fetch den Friend")
        const urlFriend = `${api(ApiEndpoint.PROFILE)}/Friend/${profileId}`;
        try {
            const response = await authorizedFetch(urlFriend, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            if (result != null) {
                console.log("Da la Friend")
                setFriendshipData((prev) => ({
                    ...prev,
                    friends: true
                }));
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        let profileId = params.get("profileId") || ""
        if (profileId == "") {
            profileId = userId || ""
        }
        setProfileId(profileId)

        const getData = async () => {
            const url = `${api(ApiEndpoint.PROFILE)}/Profile/${profileId}`;
            try {
                const response = await authorizedFetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                console.log(json);
                setVisitor(json["isVisitor"]);
                console.log(json["isVisitor"]);
                const user = json["user"]
                setDetails(prevDetails => ({
                    ...prevDetails,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture.trim() == "" ? "/images/default_profile.png" : `${api(ApiEndpoint.PROFILE)}/${user.profilePicture.replaceAll("\\", "\/")}`,
                    background: user.background.trim() == "" ? "/images/postBackgrounds/1.jpg" : `${api(ApiEndpoint.PROFILE)}/${user.background.replaceAll("\\", "\/")}`,
                    username: user.userName,
                    location: user.location,
                    instagram: user.instagram,
                    twitter: user.twitter,
                    github: user.github
                }));
                if (json["isVisitor"]) {
                    console.log("Kiem tra ban be")
                    await getFriendStatus(profileId)
                }

            } catch (error) {
                console.error(error.message);
            }

        }

        getData()


        const getPost = async () => {
            const resp = await authorizedFetch(`${api(ApiEndpoint.POST)}/Post/Profile/${profileId}`)
            const data = await resp.json()

            console.log(data)
            setPosts(data)
        }
        getPost()

    }, [params])



    useEffect(() => {
        const getUser = async () => {
            const resp = await authorizedFetch(`${api(ApiEndpoint.PROFILE)}/Profile/${userId}`)
            const data = await resp.json()
            const user = data["user"]
            userStore.set({
                firstName: user["firstName"],
                lastName: user["lastName"],
                name: user["userName"],
                profilePicture: `${api(ApiEndpoint.PROFILE)}/${user["profilePicture"]}`
            })

        }
        getUser()
    }, [])

    if (userStore.user == null) {
        return (
            <Loading />
        )
    }



    async function getFriendStatus(profileId: string) {
        console.log("Get Friend Status")
        if (profileId == null) {
            profileId = ""
        }
        const url = `${api(ApiEndpoint.PROFILE)}/Friend/Request/${profileId}`;
        try {
            const response = await authorizedFetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log("Get Friend Status: " + response);
            console.log(response)
            if (!response.ok) {
                await getIsFriend(profileId);
                return
            }

            const result = await response.json();
            const recieverId = result["recieverId"]
            const senderId = result["senderId"]
            setFriendshipData((prev) => ({
                ...prev,
                requestSent: profileId === recieverId,
                requestReceived: profileId !== recieverId,
            }));


        } catch (error) {
            console.error(error.message);
        }

    }

    async function getFriend() {
        console.log("Get List Friend")
        const url = `${api(ApiEndpoint.PROFILE)}/Friend`;
        try {
            const response = await authorizedFetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            console.log("Get Friend: " + response);
            console.log(response)
            

        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            {visible && <CreatePostPopUp user={userStore.user} setVisible={setVisible} />}
            <div className={style.profile}>

                <UserHeader user={userStore.user} page="profile" />
                <div className={style.profile_top}>
                    <div className={style.profile_container}>
                        <Cover cover={details.background} visitor={visitor} />
                        <ProfilePictureInfos
                            profile={{
                                picture: details.profilePicture,
                                username: details.username,
                                friendship: friendshipData,
                                setFriendShip: setFriendshipData
                            }}
                            visitor={visitor}
                        />
                        <ProfileMenu />
                    </div>
                </div>
                <div className={style.profile_bottom}>
                    <div className={style.profile_container}>
                        <div className={style.bottom_container}>
                            {/*<PplYouMayKnow />*/}
                            <div className={style.profile_grid}>
                                <div className={style.profile_left}>
                                    <Intro details={details} visitor={visitor} />
                                    <Photos />
                                    {/*<Friends />*/}
                                    {/*<div className={style.relative_fb_copyright}>*/}
                                    {/*    <Link href="/">Privacy </Link>*/}
                                    {/*    <span>. </span>*/}
                                    {/*    <Link href="/">Terms </Link>*/}
                                    {/*    <span>. </span>*/}
                                    {/*    <Link href="/">Advertising </Link>*/}
                                    {/*    <span>. </span>*/}
                                    {/*    <Link href="/">*/}
                                    {/*        Ad Choices <i className={icons.ad_choices_icon}></i>{" "}*/}
                                    {/*    </Link>*/}
                                    {/*    <span>. </span>*/}
                                    {/*    <Link href="/"></Link>Cookies <span>. </span>*/}
                                    {/*    <Link href="/">More </Link>*/}
                                    {/*    <span>. </span> <br />*/}
                                    {/*    Meta © 2022*/}
                                    {/*</div>*/}
                                </div>

                                <div className={style.profile_right}>
                                    {!visitor && (
                                        <CreatePost user={user} profile setVisible={setVisible} />
                                    )}
                                    {/*<GridPosts />*/}
                                    <div className={style.posts}>
                                        {posts.map((p) => <Post key={p.id} post={p} user={userStore.user} />)}

                                        {/* <div className={style.no_posts}>No posts available</div> */}
                                        {/*<Post post={postVar} user={user} key={1} />*/}
                                        {/*<Post post={postVar1} user={user} key={2} />*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupPostDialog />

        </>
    );
};

export default ProfilePage;
