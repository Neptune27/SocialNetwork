import { useRef, useState } from "react";
import useClickOutside from "../../helper/useClickOutside";
import Image from "next/image";
import style from "@/styles/Profile.module.scss";
import { authorizedFetch } from "../../Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "../../api/const";
import { useRouter } from "next/navigation";
interface Friendship {
    friends?: boolean;
    following?: boolean;
    requestSent?: boolean;
    requestReceived?: boolean;
}
interface FriendShipProps {
    friendship: Friendship;
    setFriendship: React.Dispatch<React.SetStateAction<boolean>>
}

const FriendShip = ({ friendship, setFriendship }: FriendShipProps) => {
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const menu = useRef(null);
    const menu1 = useRef(null);
    useClickOutside(menu, () => setFriendsMenu(false));
    useClickOutside(menu1, () => setRespondMenu(false));
    const router = useRouter()
    async function sendFriendRequest() {

        const searchParams = new URLSearchParams(window.location.search);
        let profileId = searchParams.get("profileId")
        if (profileId == null) {
            profileId = ""
        }
        const url = `${api(ApiEndpoint.PROFILE)}/Friend/Request/`;
        try {
            const response = await authorizedFetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileId)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            setFriendship((prev) => ({
                ...prev,
                requestSent: true
            }));
            router.refresh()
        } catch (error) {
            console.error(error.message);
        }

    }

    async function deleteFriendRequest() {

        const searchParams = new URLSearchParams(window.location.search);
        let profileId = searchParams.get("profileId")
        if (profileId == null) {
            profileId = ""
        }
        const url = `${api(ApiEndpoint.PROFILE)}/Friend/Request/`;
        try {
            const response = await authorizedFetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileId)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            


        } catch (error) {
            console.error(error.message);
        }
        router.refresh()

    }



    return (
        <div className={style.friendship}>
            {friendship?.friends ? (
                <div className={style.friends_menu_wrap}>
                    <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
                        <Image src="/icons/friends.png" alt="" width={24} height={24} />

                        <span>Friends</span>
                    </button>
                    {friendsMenu && (
                        <div className={style.open_cover_menu} ref={menu}>
                            <div className={`${style.open_cover_menu_item} hover1`}>
                                <Image src="/icons/favoritesOutline.png" alt="" width={24} height={24} />
                                Favorites
                            </div>
                            <div className={`${style.open_cover_menu_item} hover1`}>
                                <Image src="/icons/editFriends.png" alt="" width={24} height={24} />
                                Edit Friend list
                            </div>
                            {friendship?.following ? (
                                <div className={`${style.open_cover_menu_item} hover1`}>
                                    <Image src="/icons/unfollowOutlined.png" alt="" width={24} height={24} />
                                    Unfollow
                                </div>
                            ) : (
                                <div className={`${style.open_cover_menu_item} hover1`}>
                                    <Image src="/icons/unfollowOutlined.png" alt="" width={24} height={24} />
                                    Follow
                                </div>
                            )}
                            <div className={`${style.open_cover_menu_item} hover1`}>
                                <i className="unfriend_outlined_icon"></i>
                                Unfriend
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                !friendship?.requestSent &&
                !friendship?.requestReceived && (
                    <button onClick={sendFriendRequest} className="blue_btn">
                        <Image src="/icons/addFriend.png" alt="" width={24} height={24} className="invert" />
                        <span>Add Friend</span>
                    </button>
                )
            )}
            {friendship?.requestSent ? (
                <button className="blue_btn" onClick={deleteFriendRequest} >
                    <Image
                        src="/icons/cancelRequest.png"
                        className="invert"
                        alt="" width={24} height={24}
                    />
                    <span>Cancel Request</span>
                </button>
            ) : (
                friendship?.requestReceived && (
                    <div className="friends_menu_wrap">
                        <button className="gray_btn" onClick={() => setRespondMenu(true)}>
                            <Image src="/icons/friends.png" alt="" width={24} height={24} />
                            <span>Respond</span>
                        </button>
                        {respondMenu && (
                            <div className="open_cover_menu" ref={menu1}>
                                    <div onClick={sendFriendRequest} className={`${style.open_cover_menu_item}  hover1`} >Confirm</div>
                                    <div onClick={deleteFriendRequest} className={`${style.open_cover_menu_item} hover1`}>Delete</div>
                            </div>
                        )}
                    </div>
                )
            )}
            {friendship?.following ? (
                <button className="gray_btn">
                    <Image src="/icons/follow.png" alt="" width={24} height={24} />
                    <span>Following</span>
                </button>
            ) : (
                <button className="blue_btn">
                    <Image src="/icons/follow.png" className="invert" alt="" width={24} height={24} />
                    <span>Follow</span>
                </button>
            )}
            <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
                <Image
                    src="/icons/message.png"
                    className={friendship?.friends && "invert"}
                    alt="" width={24} height={24}
                />
                <span>Message</span>
            </button>
        </div>
    );
};

export default FriendShip;
