'use client';

import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useTranslations } from 'next-intl';
import { eventsService } from '@/lib/api/events.service';

interface EventImagesProps {
  onMainImagePreviewChange?: (previewUrl: string) => void;
}

export function EventImages({ onMainImagePreviewChange }: EventImagesProps) {
  const { setValue } = useFormContext<CreateEventFormData>();
  const t = useTranslations('EventImages');
  const [uploading, setUploading] = useState({
    cover: false,
    logo: false,
    main: false,
  });
  const [previewUrls, setPreviewUrls] = useState({
    coverImg: '',
    logoImg: '',
    mainImg: '',
  });

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

    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({
      ...prev,
      [type]: localPreviewUrl,
    }));

    if (type === 'mainImg') {
      onMainImagePreviewChange?.(localPreviewUrl);
    }

    try {
      const data = await eventsService.uploadImage(file);
      const serverImagePath = data.filePath;

      setValue(type, serverImagePath, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading image:', error);
      setPreviewUrls((prev) => ({
        ...prev,
        [type]: '',
      }));
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type.replace('Img', '')]: false,
      }));
    }
  };

  return (
    <Card className='max-w-[45em] mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold'>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='relative w-full h-[200px] bg-gray-200 rounded-md overflow-hidden'>
          {previewUrls.coverImg ? (
            <Image
              src={previewUrls.coverImg}
              alt='Cover'
              fill
              className='object-cover'
            />
          ) : (
            <div className='flex items-center justify-center w-full h-full text-gray-500'>
              {t('coverLabel')}
            </div>
          )}
          <div className='absolute top-2 right-2'>
            <Button
              type='button'
              size='sm'
              variant='secondary'
              className='bg-black/70 text-white hover:bg-black/80'
              onClick={() => coverInputRef.current?.click()}
              disabled={uploading.cover}
            >
              {uploading.cover
                ? t('uploading')
                : previewUrls.coverImg
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
            {previewUrls.mainImg ? (
              <Image
                src={previewUrls.mainImg}
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
                type='button'
                size='sm'
                variant='secondary'
                className='bg-black/70 text-white hover:bg-black/80'
                onClick={() => mainInputRef.current?.click()}
                disabled={uploading.main}
              >
                {uploading.main
                  ? t('uploading')
                  : previewUrls.mainImg
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
            {previewUrls.logoImg ? (
              <Image
                src={previewUrls.logoImg}
                alt='Logo'
                fill
                className='object-cover'
              />
            ) : (
              <div className='flex items-center justify-center w-full h-full text-gray-500'>
                {t('logoLabel')}
              </div>
            )}
            <div className='absolute top-2 right-2'>
              <Button
                type='button'
                size='sm'
                variant='secondary'
                className='bg-black/70 text-white hover:bg-black/80'
                onClick={() => logoInputRef.current?.click()}
                disabled={uploading.logo}
              >
                {uploading.logo
                  ? t('uploading')
                  : previewUrls.logoImg
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
      </CardContent>
    </Card>
  );
}
