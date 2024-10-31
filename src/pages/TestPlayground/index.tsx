import IconDiscard from '@/icons/discard.tsx';
import IconCrystal from '@/icons/crystal.tsx';
import IconSettingsGear from '@/icons/settingsGear.tsx';
import IconShield from '@/icons/shield.tsx';
import { SetTheme, themes } from '@/theme';

const TestPlayground = () => {
  const switchTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    SetTheme(themes[newTheme]);
  }
  return (
    <>
      <button onClick={switchTheme}>Switch theme</button>
      <IconCrystal/>
      <IconDiscard/>
      <IconSettingsGear/>
      <IconShield/>
    </>
  )
}

export default TestPlayground