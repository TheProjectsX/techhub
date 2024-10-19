"use client";

import UserDataContext from "@/app/context/context";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = ({ params }) => {
    const context = useContext(UserDataContext);
    const [postData, setPostData] = useState({});
    const { userData } = context;

    if (!userData) {
        return redirect("/account/login");
    }

    const handleCreateNewPost = async (e) => {
        e.preventDefault();
        const form = e.target;

        const body = {
            title: form.title.value,
            content: form.content.value,
            imageUrl:
                form.imageUrl.value === ""
                    ? "https://i.ibb.co.com/ryNv8bc/image-placeholder.jpg"
                    : form.imageUrl.value,
            tags: form.tags.value.split(" "),
        };

        const serverResponse = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${params.id}`,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(body),
                    credentials: "include",
                }
            )
        ).json();

        if (serverResponse.success) {
            toast.success("Post Updated!");
        } else {
            toast.error(serverResponse.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const serverResult = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${params.id}`
                )
            ).json();

            if (!serverResult.success) {
                toast.error(serverResult.message);
            } else {
                setPostData(serverResult);
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex flex-col items-center lg:w-2/3 mb-10">
            <h1 className="text-3xl font-['Acme',sans-serif] mb-6 xl:mb-10">
                Create New Post
            </h1>

            <form
                onSubmit={handleCreateNewPost}
                className="gap-6 xl:gap-8 flex flex-col w-3/4"
            >
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        name="imageUrl"
                        defaultValue={postData.imageUrl ?? ""}
                        disabled={!postData.imageUrl}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Cover Image Link
                    </p>
                </label>
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        name="title"
                        defaultValue={postData.title ?? ""}
                        disabled={!postData.title}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Title
                    </p>
                </label>

                <label className="relative">
                    <textarea
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 h-60"
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        name="content"
                        defaultValue={postData.content ?? ""}
                        disabled={!postData.content}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                        required
                    ></textarea>
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Content
                    </p>
                </label>
                <label className="relative">
                    <input
                        type="text"
                        className="border-2 border-gray-500 rounded-md py-2 px-3 w-full dark:bg-gray-900 "
                        onFocus={(e) =>
                            e.target.nextElementSibling.classList.add(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            )
                        }
                        name="tags"
                        defaultValue={(postData.tags ?? []).join(" ")}
                        disabled={!postData.tags}
                        onBlur={(e) => {
                            if (e.target.value !== "") return;
                            e.target.nextElementSibling.classList.remove(
                                "transform",
                                "-translate-y-[1.4rem]",
                                "bg-white",
                                "dark:bg-gray-900"
                            );
                        }}
                    />
                    <p className="absolute top-2 left-3 group-focus:text-red-500 transition duration-200 px-1">
                        Categories (Separate by Space)
                    </p>
                </label>
                <button
                    type="submit"
                    className="w-full border-2 border-primary bg-primary text-white p-2 text-lg rounded-md font-bold hover:border-black hover:bg-black active:bg-white active:text-black"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default page;
