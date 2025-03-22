'use client';

import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useTranslations } from 'next-intl';

export function EventImages() {
  const { setValue, watch } = useFormContext<CreateEventFormData>();
  const t = useTranslations('EventImages');
  const [uploading, setUploading] = useState({
    cover: false,
    logo: false,
    main: false,
  });

  const coverImg = watch('coverImg');
  const logoImg = watch('logoImg');
  const mainImg = watch('mainImg');

  const coverInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'coverImg' | 'logoImg' | 'mainImg'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({
      ...prev,
      [type.replace('Img', '')]: true,
    }));

    try {
      // const formData = new FormData();
      // formData.append("file", file);
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();
      // const imageUrl = data.url;

      const imageUrl = URL.createObjectURL(file);

      setValue(type, imageUrl, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type.replace('Img', '')]: false,
      }));
    }
  };

  return (
    <div>
      <div className='relative w-full h-[200px] bg-gray-200 rounded-md overflow-hidden'>
        {coverImg ? (
          <Image src={coverImg} alt='Cover' fill className='object-cover' />
        ) : (
          <div className='flex items-center justify-center w-full h-full text-gray-500'>
            {t('coverLabel')}
          </div>
        )}
        <div className='absolute top-2 right-2'>
          <Button
            size='sm'
            variant='secondary'
            className='bg-black/70 text-white hover:bg-black/80'
            onClick={() => coverInputRef.current?.click()}
            disabled={uploading.cover}
          >
            {uploading.cover
              ? t('uploading')
              : coverImg
              ? t('changeCover')
              : t('addCover')}
          </Button>
          <input
            type='file'
            accept='image/*'
            ref={coverInputRef}
            className='hidden'
            onChange={(e) => handleImageChange(e, 'coverImg')}
          />
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-4'>
        <div className='relative w-[200px] h-[150px] bg-gray-200 rounded-md overflow-hidden'>
          {mainImg ? (
            <Image
              src={mainImg}
              alt='Main photo'
              fill
              className='object-cover'
            />
          ) : (
            <div className='flex items-center justify-center w-full h-full text-gray-500'>
              {t('mainPhotoLabel')}
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <Button
              size='sm'
              variant='secondary'
              className='bg-black/70 text-white hover:bg-black/80'
              onClick={() => mainInputRef.current?.click()}
              disabled={uploading.main}
            >
              {uploading.main
                ? t('uploading')
                : mainImg
                ? t('changeMainPhoto')
                : t('addMainPhoto')}
            </Button>
            <input
              type='file'
              accept='image/*'
              ref={mainInputRef}
              className='hidden'
              onChange={(e) => handleImageChange(e, 'mainImg')}
            />
          </div>
        </div>

        <div className='relative w-[100px] h-[100px] bg-gray-200 rounded-md overflow-hidden'>
          {logoImg ? (
            <Image src={logoImg} alt='Logo' fill className='object-cover' />
          ) : (
            <div className='flex items-center justify-center w-full h-full text-gray-500'>
              {t('logoLabel')}
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <Button
              size='sm'
              variant='secondary'
              className='bg-black/70 text-white hover:bg-black/80'
              onClick={() => logoInputRef.current?.click()}
              disabled={uploading.logo}
            >
              {uploading.logo
                ? t('uploading')
                : logoImg
                ? t('changeLogo')
                : t('addLogo')}
            </Button>
            <input
              type='file'
              accept='image/*'
              ref={logoInputRef}
              className='hidden'
              onChange={(e) => handleImageChange(e, 'logoImg')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
