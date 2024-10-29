import Image from "next/image";
import React from "react";

interface EditDetailProps { details }

const EditDetail = ({details }:EditDetailProps) => {
    return <div className="blur">
        <div className="postBox infosBox">
            <div className="box_header">
                <div className="small_circle">
                    <i className="exit_icon"></i>
                </div>
                <span>Edit Details</span>
            </div>
            <div className="details_wrapper scrollbar">
                <div className="details_col">
                    <span>Customize Your Intro</span>
                    <span>Details you select will be public</span>
                </div>
                <Detail
                    header="Other Name"
                    value={details?.othername}
                    img="studies"
                    placeholder="add other name"
                    name="othername"
                />
            </div>
        </div>
    </div>;
};

export default EditDetail;
