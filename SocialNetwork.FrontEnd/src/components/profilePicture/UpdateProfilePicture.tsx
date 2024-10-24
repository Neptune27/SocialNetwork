"use client";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import style from "@/components/profilePicture/style.module.scss";
import icons from "@/public/icons.module.scss";
import getCroppedImg from "@/helper/getCroppedImg";

interface UpdateProfilePictureProps {
    setImage: (value: string) => void;
    image: string;
    setShow: (value: boolean) => void;
    pRef?: React.RefObject<HTMLDivElement>;
}

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

const UpdateProfilePicture: React.FC<UpdateProfilePictureProps> = ({
    setImage,
    image,
    setShow,
    pRef,
}) => {
    const [description, setDescription] = useState("");
    const [zoom, setZoom] = useState(1);
    const cropperRef = useRef<HTMLImageElement>(null);
    const slider = useRef<HTMLInputElement>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedAreaPixels);
        console.log("Cropped Area Pixels: ", croppedAreaPixels);
    }, []);

    const zoomIn = () => {
        if (slider.current) {
            slider.current.stepUp();
            setZoom(Number(slider.current.value));
        }
    };

    const zoomOut = () => {
        if (slider.current) {
            slider.current.stepDown();
            setZoom(Number(slider.current.value));
        }
    };

    const getCroppedImage = useCallback(
        async (show: boolean) => {
            try {
                if (croppedAreaPixels) {
                    const img = await getCroppedImg(image, croppedAreaPixels);
                    if (img) {
                        if (show) {
                            setZoom(1);
                            setCrop({ x: 0, y: 0 });
                            setImage(img);
                            console.log("just show");
                        } else {
                            console.log("not show");
                            console.log(img);
                            return img;
                        }
                    } else {
                        console.log("Cropped image is null.");
                    }
                } else {
                    console.log("Cropped area pixels is null.");
                }
            } catch (error) {
                console.log(error);
            }
        },
        [croppedAreaPixels, image, setImage]
    );

    return (
        <div className={`${style.postBox} ${style.update_img}`}>
            <div className={style.box_header}>
                <div className={style.small_circle} onClick={() => setImage("")}>
                    <i className={icons.exit_icon}></i>
                </div>
                <span>Update profile picture</span>
            </div>
            <div className={style.update_image_desc}>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${style.textarea_blue} ${style.details_input}`}
                ></textarea>
            </div>
            <div className={style.update_center}>
                <div className={style.crooper}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1 / 1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                    />
                </div>
                <div className={style.slider}>
                    <div className={`${style.slider_circle} hover1`} onClick={zoomOut}>
                        <i className={icons.minus_icon}></i>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.2}
                        ref={slider}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                    />
                    <div className={`${style.slider_circle} hover1`} onClick={zoomIn}>
                        <i className={icons.plus_icon}></i>
                    </div>
                </div>
            </div>
            <div className={style.flex_up}>
                <div className="gray_btn" onClick={() => getCroppedImage(true)}>
                    <i className={icons.crop_icon}></i>Crop photo
                </div>
                <div className="gray_btn">
                    <i className={icons.temp_icon}></i>Make Temporary
                </div>
            </div>
            <div className={style.flex_p_t}>
                <i className={icons.public_icon}></i>
                Your profile picture is public
            </div>
            <div className={style.update_submit_wrap}>
                <div className={style.blue_link} onClick={() => setImage("")}>
                    Cancel
                </div>
                <button className="blue_btn" onClick={() => getCroppedImage(false)}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default UpdateProfilePicture;
