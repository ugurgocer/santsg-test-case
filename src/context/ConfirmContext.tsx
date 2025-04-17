import React, { useState } from 'react';
import Button from '@/components/Button';

interface ConfirmOptions {
    message: string;
    onResponse: (confirmed: boolean) => void;
}

const ConfirmContext = React.createContext<(opts: ConfirmOptions) => void>(() => {});

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);

    const confirm = (opts: ConfirmOptions) => {
        setOptions(opts);
    };

    const handleConfirm = () => {
        options?.onResponse(true);
        setOptions(null);
    };

    const handleCancel = () => {
        options?.onResponse(false);
        setOptions(null);
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            {options && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
                        <p className="text-gray-800">{options.message}</p>
                        <div className="flex justify-end gap-2">
                            <Button title='Cancel' onClick={handleCancel} type='danger' />
                            <Button title='OK' onClick={handleConfirm} />
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = React.useContext(ConfirmContext);
    if (!context) throw new Error('useConfirm must be used within ConfirmProvider');
    return context;
};