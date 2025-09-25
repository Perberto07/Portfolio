import type { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background overlay with blur */}
            <div
                className="absolute inset-0 backdrop-blur-xs bg-black/10"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 z-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
