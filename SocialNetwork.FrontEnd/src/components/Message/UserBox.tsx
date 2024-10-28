"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "./Avatar";
import LoadingModal from "./model/LoadingModal";
import { IMessageUser } from "@/interfaces/IMessage";
import { api, ApiEndpoint } from "@/api/const";

type Props = {
  data: IMessageUser;
};

function UserBox({ data }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    await axios
      .post(`${api(ApiEndpoint.MESSAGING)}/room`, {
        userId: data.Id,
      })
      .then((data) => {
        router.push(`/Message/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-900 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {data.Name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default UserBox;
