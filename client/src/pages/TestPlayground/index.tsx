import { LabeledRadioButton, LabeledSwitch, RangeInput } from "@/components";
import { BackButton } from "@/components/ui/BackButton/BackButton";
import { RoundedButton } from "@/components/ui/RoundedButton/RoundedButton";
import { UsersList } from "@/components/user/UsersList/UsersList";
import * as Icons from "@/icons";
import { useThemeStore } from "@/store/theme/useThemeStore";
import { setTheme, useTheme } from "@/theme";
import { NumericTuple } from "@/types/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const TestPlayground = () => {
  const currentTheme = useThemeStore((state) => state.theme);

  const theme = useTheme();
  const switchTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const [testValues, setTestValues] = useState<NumericTuple<2>>([0, 100]);
  const [test3Values, setTest3Values] = useState<NumericTuple<3>>([0, 50, 100]);
  const [test1Value, setTest1Value] = useState<NumericTuple<1>>([50]);
  const [range] = useState([0, 50]);
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <RoundedButton onClick={switchTheme}>Switch theme</RoundedButton>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          alignItems: "center",
          overflow: "hidden",
          maxWidth: "70vw",
          padding: 10,
          backgroundColor: "#FFFFFF2A",
          border: `3px solid ${theme.accent_color}`,
          borderRadius: 20,
        }}
      >
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(Icons).map(([_, Component], index) => (
            <Component key={index} color={theme.accent_color} focused />
          ))
        }
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 30,
          maxWidth: 600,
          padding: 10,
          backgroundColor: "#FFFFFF2A",
          border: `3px solid ${theme.accent_color}`,
          borderRadius: 20,
        }}
      >
        <div style={{ color: theme.accent_color }}>Range input</div>
        <div
          style={{ width: "100%", height: 1, backgroundColor: theme.grey }}
        />
        <RangeInput
          label={""}
          values={testValues}
          setValues={(v) => setTestValues(v)}
          min={range[0]}
          max={range[1]}
          step={1}
          unit={"units"}
        />
        <RangeInput
          label={"тест с 1 значением"}
          values={test1Value}
          setValues={(v) => setTest1Value(v)}
          min={0}
          max={100}
          step={1}
          unit={"units"}
        />
        <RangeInput
          label={"тест с 3 значениями"}
          values={test3Values}
          setValues={(v) => setTest3Values(v)}
          min={0}
          max={100}
          step={1}
          unit={"units"}
        />
        <div style={{ color: theme.accent_color }}>Labeled switch</div>
        <hr />
        <LabeledSwitch
          label="checked"
          value={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <RoundedButton onClick={() => console.log("clicked")}>
            Click me
          </RoundedButton>
        </div>

        <BackButton />
      </div>
      <Link style={{ fontWeight: 600 }} to="/login_email">
        to login
      </Link>
    </div>
  );
};

export default TestPlayground;
