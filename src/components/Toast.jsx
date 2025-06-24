import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Toast = forwardRef(({ duration = 3000 }, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useImperativeHandle(ref, () => ({
        show: (msg = "Error! Please try again!") => {
            setMessage(msg);
            setVisible(true);
            setTimeout(() => setVisible(false), duration);
        },
    }));

    return (
        <>
            {visible && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                    {message}
                </div>
            )}
        </>
    );
});

Toast.propTypes = {
    duration: PropTypes.number,
};
Toast.displayName = "Toast";

export default Toast;
