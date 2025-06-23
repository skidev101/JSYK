import { X } from 'lucide-react';
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

                    <FadeRight className='fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-800 z-50 p-4 shadow-lg flex flex-col'>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Profile</h2>
                            <X className="cursor-pointer" onClick={onClose} />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-2" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{username}</h3>
                            <p className="text-sm text-gray-500">{email}</p>
                            { bio && (<p className="mt-2 text-sm text-gray-600">{bio}</p> )}
                        </div>
                    </FadeRight>
                </>
            )}
        </AnimatePresence>
    )
}

export default ProfileDrawer;