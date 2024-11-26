import React, { useEffect, useState } from "react";
import styles from "@/styles/rightHome.module.scss";
import { Dots, NewRoom, Search } from "@/public/svg";
import Contact from "./Contact";
import { api, ApiEndpoint } from "../../../api/const";
import { authorizedFetch } from "../../../Ultility/authorizedFetcher";

interface UserData {
    id: string;
    name: string;
    profilePicture: string;
}

interface UserProps {
    user: UserData

}

const RightHome = ({ user }: UserProps) => {
    const color = "#65676b";
    const [friends, setFriends] = useState<UserData[]>([])
    useEffect(() => {
        const getFriends = async () => {
            const resp = await authorizedFetch(`${api(ApiEndpoint.PROFILE)}/Friend`)
            const data = (await resp.json()).map(d => {
                return {
                    ...d,
                    profilePicture: `${api(ApiEndpoint.PROFILE)}/${d.profilePicture}`
                }
            })
            console.log(data)
            setFriends(data)

        }
        getFriends()
    }, [])
  return (
    <div className={styles.right_home}>
      {/*<div className={styles.heading}> Sponsored</div>*/}
      {/*<div className={styles.splitter1}></div>*/}
      <div className={styles.contacts_wrap}>
        <div className={styles.contacts_header}>
          <div className={styles.contacts_header_left}>Friends</div>
          {/*<div className={styles.contacts_header_right}>*/}
          {/*  <div className={`${styles.contact_circle} hover1`}>*/}
          {/*    <NewRoom color={color} />*/}
          {/*  </div>*/}
          {/*  <div className={`${styles.contact_circle} hover1`}>*/}
          {/*    <Search color={color} />*/}
          {/*  </div>*/}
          {/*  <div className={`${styles.contact_circle} hover1`}>*/}
          {/*    <Dots color={color} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className={styles.contacts_list}>
                  <Contact user={user} />
                  {friends.map(f => <Contact key={f.name} user={f}/>)}
        </div>
      </div>
    </div>
  );
};

export default RightHome;
