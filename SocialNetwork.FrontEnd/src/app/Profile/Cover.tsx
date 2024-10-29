"use client";
import useClickOutside from "@/helper/useClickOutside";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helper/getCroppedImg";
import OldCovers from "./OldCover";

interface CoverProps {
  cover: string;
  visitor: boolean;
}

const Cover = ({ cover, visitor }: CoverProps) => {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [coverPicture, setCoverPicture] = useState("");
    const refInput = useRef(null);

    const [show, setShow] = useState(false);

    useClickOutside(menuRef, () => setShowCoverMenu(false));


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"
        ) {
            setError(`${file.name} format is not supported.`);
            return;
        } else if (file.size > 1024 * 1024 * 5) {
            setError(`${file.name} is too large. Max 5MB allowed.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (event.target?.result) {
                setCoverPicture(event.target.result as string);
            }
        };
    };

    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedAreaPixels);
        console.log("Cropped Area Pixels: ", croppedAreaPixels);
    }, []);

    const photos = ["/stories/1.jpg", "/stories/2.png"]
    

    const getCroppedImage = useCallback(
        async (show: boolean) => {
            try {
                if (croppedAreaPixels) {
                    const img = await getCroppedImg(coverPicture, croppedAreaPixels);
                    if (img) {
                        if (show) {
                            setZoom(1);
                            setCrop({ x: 0, y: 0 });
                            setCoverPicture(img);
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
        [croppedAreaPixels, coverPicture, setCoverPicture]
    );
    const coverRef = useRef(null);
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(coverRef.current.clientWidth);
    }, [window.innerWidth]);

    const updateCoverPicture = async () => {
        
        let img = await getCroppedImage();
        setCoverPicture(img)
        //setCoverPicture("");
            
    };

  return (
      <div className={style.profile_cover} ref={coverRef}>
          {coverPicture && (
              <div className={style.save_changes_cover}>
                  <div className={style.save_changes_left}>
                      <i className="public_icon"></i>
                      Your cover photo is public
                  </div>
                  <div className={style.save_changes_right}>
                      <button
                          className={`${style.opacity_btn} blue_btn` }
                          onClick={() => setCoverPicture("")}
                      >
                          Cancel
                      </button>
                      <button className="blue_btn " onClick={() => updateCoverPicture()}>
                          Save changes
                      </button>
                  </div>
              </div>
          )}
      {cover && (
        <Image
          src={cover}
          className={style.cover}
          alt=""
          width={945}
          height={350}
        />
      )}
          <input
              type="file"
              ref={refInput}
              hidden
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImage}
          />

          {coverPicture && <div className={style.cover_crooper}>
              <Cropper
                  image={coverPicture}
                  crop={crop}
                  zoom={zoom}
                  aspect={width / 350}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                  objectFit="horizontal-cover"
              />
          </div>}

      {visitor && (
        <div className={style.udpate_cover_wrapper}>
          <div
            className={style.open_cover_update}
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className={icons.camera_filled_icon}></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className={style.open_cover_menu} ref={menuRef}>
                <div className={`${style.open_cover_menu_item} hover1`} onClick={() => setShow(true)}>
                <i className={icons.photo_icon}></i>
                Select Photo
              </div>
                          <div className={`${style.open_cover_menu_item} hover1`} onClick={() => refInput.current.click()}>
                <i className={icons.upload_icon}></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
          )}
          {show && (
              <OldCovers
                  photos={photos}
                  setCoverPicture={setCoverPicture}
                  setShow={setShow}
              />
          )}
    </div>
  );
};

export default Cover;
