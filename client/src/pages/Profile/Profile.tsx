import { RangeInput } from "@/components";
import { Separator } from "@/components/ui/Separator/Separator";
import { SwitchModeButtonGroup } from "@/components/ui/SwitchModeButtonGroup/SwitchModeButtonGroup";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { setTheme } from "@/theme";
import { ThemeType } from "@/theme/themes";
import { useState } from "react";

export const Profile = () => {
  const [editMode, setEditMode] = useState(true);
  const [height, setHeight] = useState(187);
  const [gender, setGender] = useState('male');
  const [orientatsiya, setOrientatsiya] = useState('heterosexual');
  const currentTheme = useThemeStore(state => state.theme);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SwitchModeButtonGroup
          values={['redact', 'preview']}
          displayValues={['Редактировать', 'Предросмотр']}
          value={editMode ? 'redact' : 'preview'}
          setValue={(v) => setEditMode(v === 'redact' ? true : false)}
        />
      </div>
      {!editMode ? <div>Предросмотр</div> :
      (<div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p>Обо мне</p>
        <input type="text" />
        <Separator />
        <p>Мой рост</p>
        <RangeInput label='Рост' values={[height]} setValues={(v) => setHeight(v[0])} min={0} max={200} unit='см' />
        <Separator />
        <p>Мои интересы</p>
        <input type="text" />
        <Separator />
        <p>Цели в отношениях</p>
        <input type="text" />
        <Separator />
        <p>Языки</p>
        <input type="text" />
        <Separator />
        <p>Основное(TODO: USE BOTTOM MODAL HERE)</p>
        <Separator />
        <p>Стиль жизни (TODO: USE BOTTOM MODAL HERE)</p>
        <Separator />
        <p>Образование</p>
        <input type="text" />
        <Separator />
        <p>Должность</p>
        <input type="text" />
        <Separator />
        <p>Компания</p>
        <input type="text" />
        <Separator />
        <p>Пол</p>
        <SwitchModeButtonGroup
          values={['male', 'female', 'cafelny']}
          displayValues={['Мужской', 'Женский', 'Кафельный']}
          value={gender}
          setValue={setGender}
        />
        <Separator />
        <p>Ориентация</p>
        <SwitchModeButtonGroup
          values={['heterosexual', 'homosexual', 'bisexual']}
          displayValues={['Хетеросексуал', 'Гомосексуал', 'Бисексуал']}
          value={orientatsiya}
          setValue={setOrientatsiya}
        />
        <Separator />
        <p>Настройки аккаунта(TODO: чёто)</p>
        <Separator />
        <p>Тема</p>
        <SwitchModeButtonGroup
          values={['light', 'dark']}
          displayValues={['Светлая', 'Темная']}
          value={currentTheme}
          setValue={(v) => setTheme(v as ThemeType)}
        />
      </div>)
      }
    </div>
  )
}