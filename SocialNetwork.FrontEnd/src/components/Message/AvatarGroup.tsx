"use client";

import Image from "next/image";

type Props = {
  name?: string | null;
  profile?: string | null
};

function AvatarGroup({ name, profile }: Props) {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        {
          profile == null
            ? <img src={`https://ui-avatars.com/api/?name=${name}`} alt="Avatar" />
            : <img src={`${profile}`} alt="Avatar" style={{
              width: `128px`,
            }}/>
        }
      </div>
    </div>
  );
}

export default AvatarGroup;
