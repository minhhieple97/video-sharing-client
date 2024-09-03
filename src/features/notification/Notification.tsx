import { FC } from 'react';
import { INotification } from '../../interfaces';

interface NotificationProps {
  data: INotification;
  onClose: (id: string) => void;
}

export const Notification: FC<NotificationProps> = ({ data, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-2">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">New Video Shared</h3>
          <button
            onClick={() => onClose(data.id)}
            className="text-white hover:text-gray-200 transition-colors duration-200"
            aria-label="Close notification"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-3 bg-gray-50">
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">From:</span> {data.email}
        </p>
        <p className="text-sm text-gray-800 font-medium truncate">{data.title}</p>
      </div>
    </div>
  );
};
