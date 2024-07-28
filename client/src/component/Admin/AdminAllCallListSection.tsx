import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaClock, FaPhone, FaTimes, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/AdminContext";

const AdminAllCallListSection = () => {
    const { currentAdmin } = useSelector((state: any)=> state.admin);
    const [admincallList, setAdminCallList] = useState<any[]>([]);
    const { socket, setIsVideoCall }: any = useSocket();
    const [page, setPage] = useState<number>(1);
    const [totalCalls, setTotalPages] = useState<number>(0);

    const startCall = async (isVideo: boolean = false, conId: string, userId: string, fcmToken: string) => {
        try {
            setIsVideoCall(isVideo);

            const res = await fetch("/api/start_call", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {callData: {
                    conversationId: conId,
                    callerId: currentAdmin._id,
                    adminId: currentAdmin._id,
                    userId: userId,
                    caller: "Admin",
                    callType: isVideo ? "video" : "audio",
                    receiver: "User",
                },
                token: fcmToken,
                username: currentAdmin.username
            }),
            });

            const data = await res.json();
            if (data._id) {
                socket.emit("incoming-call", {
                    conId,
                    incommingId: currentAdmin._id,
                    adminId: currentAdmin._id,
                    callerId: data._id,
                });
            }
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };

    function formatCallDuration(duration: number): string {
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
        const formattedHours = hours < 10 ? `0${hours}` : hours.toString();

        if (hours === 0) {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const fetchCalls = async () => {
        try {
            const res = await fetch(`/api/get_calls/${currentAdmin._id}/${page}`);
            const data: any = await res.json();
           console.log(data)
            if (data) {
                setAdminCallList(data.calls);
                setTotalPages(Math.ceil(data.totalCalls / 10)); // Adjust the divisor if needed
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCalls();
    }, [page]);

    return (
        <div className="container mx-auto flex flex-col">
            <div className="p-4 w-full h-full border-2 rounded-lg shadow-lg bg-white">
                <div className="flex justify-between h-full items-center px-5 py-2 border-b cursor-pointer">
                    <h2 className="text-2xl font-bold">All Calls</h2>
                </div>
                <div className="overflow-y-scroll max-h-[540px]">
                    {admincallList &&
                        admincallList.map((calls: any) => (
                            <div
                                key={calls._id}
                                className="flex items-center h-[70px] rounded-lg justify-between border-b mt-2 p-2 hover:bg-gray-100"
                            >
                                <div className="flex flex-col w-2/3">
                                    <span className="text-xs md:text-sm text-gray-500">
                                        {new Date(calls.createdAt).toLocaleString()}
                                    </span>
                                    <span className="text-sm md:text-lg font-semibold">
                                        {calls?.userId?.username}
                                    </span>
                                    <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500">
                                        {calls.caller === 'Admin' ? (
                                            <FaPhone className="text-blue-500" />
                                        ) : (
                                            <FaClock className="text-green-500" />
                                        )}
                                        <span>
                                            {calls.caller === 'Admin' ? 'Outgoing' : 'Incoming'}
                                        </span>
                                        <span>
                                            {calls?.callDuration && (
                                                <>Call Duration: {formatCallDuration(calls?.callDuration)}</>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1 w-1/3">
                                    <div className="flex items-center gap-2">
                                        {calls.callType === 'video' ? (
                                            <FaVideo
                                                onClick={() => startCall(true, calls.conversationId, calls.userId._id, calls.userId.fcmToken)}
                                                className="cursor-pointer text-red-500"
                                            />
                                        ) : (
                                            <FaPhone
                                                onClick={() => startCall(false, calls.conversationId, calls.userId._id, calls.userId.fcmToken)}
                                                className="cursor-pointer text-green-500"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {calls.callStatus === 'answered' && (
                                            <FaCheck className="text-green-500" />
                                        )}
                                        {calls.callStatus === 'declined' && (
                                            <FaTimes className="text-red-500" />
                                        )}
                                        {calls.callStatus !== 'answered' &&
                                            calls.callStatus !== 'declined' && (
                                                <FaClock className="text-yellow-500" />
                                            )}
                                        <span className="text-xs md:text-sm">
                                            {calls.callStatus === 'answered'
                                                ? 'Answered'
                                                : calls.callStatus === 'declined'
                                                    ? 'Declined'
                                                    : 'Missed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="p-2 bg-sky-500 text-white rounded"
                    onClick={() => setPage((prev: any) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    <FaArrowLeft />
                </button>
                <span>
                    Page {page} of {totalCalls}
                </span>
                <button
                    className="p-2 bg-sky-500 text-white rounded"
                    onClick={() => setPage((prev: any) => Math.min(prev + 1, totalCalls))}
                    disabled={page === totalCalls}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AdminAllCallListSection;
