import { AlertTriangle, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeRight } from './MotionWrappers';

type ProfileDrawerProps = {
    show: boolean;
    onClose: () => void;
    username: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ show, onClose, username, email, avatarUrl, bio }) => {
    return(
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        className='fixed inset-0 backdrop-blur-sm z-40'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <FadeRight className='fixed top-0 right-0 w-72 h-full bg-white z-60 p-4 shadow-lg flex flex-col'>
                        <div className="flex justify-between items-center mb-4 py-2 border-b-2 border-gray-300">
                            <h2 className="text-lg font-semibold">Profile</h2>
                            <X className="cursor-pointer" onClick={onClose} />
                        </div>

                        <div className='flex justify-end px-2'>
                            <button className='flex items-center rounded-full px-3 py-1 text-white bg-blue-500 transition duration-200 cursor-pointer active:scale-[0.95]'>
                                <p className='px-1 text-sm'>Edit</p>
                                <Pencil size={15} className=''/>
                            </button>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-2 p-2 outline-5 outline-gray-200" />
                            ) : (
                                <div className="w-24 h-24 text-2xl sm:text-3xl rounded-full flex items-center justify-center bg-blue-500 mb-2 p-2 sm:p-8">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                            )}
                            
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <h3 className="text-lg font-semibold mt-2">{username}</h3>
                            <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 sm:px-4 sm:py-1 rounded-full">{email}</p>
                            { bio ? (
                                <p className="text-sm text-gray-700 bg-gray-100 max-w-max px-3 py-2 mt-2 sm:mt-4 sm:px-3 sm:py-2 rounded-lg">{bio}</p> 
                            ) : (
                                <p className='text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:mt-4 sm:px-4 sm:py-1 rounded-full'>No Bio yet</p>
                            )}
                        </div>

                        <div className="fixed bottom-2 py-2 text-red-600 flex items-center border-t-1 border-gray-300">
                            <button className='flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 active:scale-[0.98] transition duration-150'>
                                <AlertTriangle size={18} />
                                <p className="text-sm sm:text-base px-2">Delete account</p>
                            </button>
                        </div>
                    </FadeRight>
                </>
            )}
        </AnimatePresence>
    )
}

export default ProfileDrawer;