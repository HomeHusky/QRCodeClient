// 1. Component Quét Mã QR (ScanQR.js)
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { makeRequest } from '../../axios';

const ScanQR = () => {
  const [result, setResult] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      try {
        // 2. Gửi Yêu Cầu Đến Máy Chủ
        const response = await axios.post('https://qr-code-backend-pi.vercel.app/api/scan', { qrData: data });

        // 5. Render Trang Từ Nội Dung Phản Hồi
        setResult(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error('Error:', err);
  };

  return (
    <div>
      <QrReader delay={300} onError={handleError} onScan={handleScan} />
      {result && <div>{/* Render nội dung từ result */}</div>}
    </div>
  );
};

export default ScanQR;
