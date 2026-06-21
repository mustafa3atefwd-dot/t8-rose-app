import {useTranslations} from 'next-intl';



export default function IndexPage(){
  const t = useTranslations();
  return <div>

    <h1 className='text-cyan-800 text-4xl mt-10 text-center font-bold'>{t('title')}</h1>

  </div>
} 