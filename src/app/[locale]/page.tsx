import { useTranslations } from 'next-intl';
import Tests from './components/test';
import { ThemeToggle } from '@/features/components/toggle-icon';



export default function IndexPage(){
  // const t = useTranslations();
  return (
    <div>

    {/* <h1 className='text-red-600'>{t('title')}</h1> */}
    <Tests/>
    <ThemeToggle/>
    
    <h2 className='border '>sdfsdf</h2>

  </div>
  )
}

