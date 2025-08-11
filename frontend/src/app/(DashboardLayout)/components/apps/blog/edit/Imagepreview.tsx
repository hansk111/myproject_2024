// import React, { useState, useEffect } from 'react';

// interface ServerImagePreviewProps {
//   imageUrl: string; // 서버에서 받아온 이미지 URL
// }

// const ServerImagePreview: React.FC<ServerImagePreviewProps> = ({ imageUrl }) => {
//   const [previewURL, setPreviewURL] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         if (!imageUrl) {
//           setError("이미지 URL이 제공되지 않았습니다.");
//           return;
//         }
//         console.log("imageUrl=====", imageUrl)
//         const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/media/${imageUrl}`);
//         console.log("response=====", response)
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const blob = await response.blob();
//         console.log("🚀 ~ loadImage ~ blob:", blob)
        
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewURL(reader.result as string);
//           console.log("🚀 ~ loadImage ~ reader.result:", reader.result)
//         };
//         console.log("preview url===", previewURL )
//         reader.readAsDataURL(blob);
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     loadImage();
//   }, [imageUrl]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {previewURL && (
//         <div>
//           <h2>미리보기</h2>
//           <img src={previewURL} alt="미리보기" style={{ maxWidth: '300px' }} />
//         </div>
//       )}
//       {!previewURL && <p>이미지를 불러오는 중...</p>}
//     </div>
//   );
// };

// export default ServerImagePreview;