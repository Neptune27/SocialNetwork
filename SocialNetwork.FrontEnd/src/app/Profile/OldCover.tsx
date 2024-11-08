import React, { useRef } from 'react'
import style from "@/styles/Profile.module.scss";
import useClickOutside from "@/helper/useClickOutside";
import Image from 'next/image';

interface OldCoversProps {
    photos: string[];
    setCoverPicture: (url: string) => void;
    setShow: (show: boolean) => void;
}

const OldCovers = ({ photos, setCoverPicture, setShow }: OldCoversProps)  => {
    const Ref = useRef(null);
    useClickOutside(Ref, () => setShow(false));
    return (
        <div className={style.blur_background}>
            <div className={`${style.selectCoverBox} ${style.postBox}`} ref={Ref}>
                <div className={style.box_header }>
                    <div
                        className="small_circle"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select photo</span>
                </div>
                <div className={style.selectCoverBox_links}>
                    <div className={style.selectCoverBox_link}>Recent Photos</div>
                    <div className={style.selectCoverBox_link }>Photo Albums</div>
                </div>
                <div className={`${style.old_pictures_wrap} scrollbar`}>
                    <div className={style.old_pictures }>
                        {photos.map((photo, index) => (
                            <Image
                                key={index}
                                src={photo}
                                alt=""
                                width={100}
                                height={105}
                                onClick={() => {
                                    setCoverPicture(photo);
                                    setShow(false);
                                }}
                            />
                        ))}
                        
                    </div>
                    <div className="old_pictures">
                        <Image src={"/stories/3.png"} alt="" width={100} height={105} onClick={() => {
                            setCoverPicture("/stories/3.jpg");
                            setShow(false);
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OldCovers