import { toPng } from 'html-to-image';

export const useKakaoShare = () => {
  const share = async ({
    targetRef,
    title,
    description,
    link,
  }: {
    targetRef: React.RefObject<HTMLDivElement>;
    title: string;
    description: string;
    link: string;
  }) => {
    if (!window.Kakao || !targetRef.current) return;

    const dataUrl = await toPng(targetRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: dataUrl,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    });
  };

  return { share };
};
