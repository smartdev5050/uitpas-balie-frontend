import { Organizer, OrganizerPermissions } from "@/lib/dataAccess";
import { Card, CardContent } from "@/lib/ui";
import { useCounter } from "@/feature-counter";
import { CounterPickerData } from "./CounterPickerData";
import { LastCounterData } from "./LastCounterData";
import { PropsWithChildren, useEffect } from "react";

type CounterPickerProps = PropsWithChildren & {
  data: OrganizerPermissions[];
  filterString: string;
};

export const CounterPicker = ({
  data,
  children,
  filterString,
}: CounterPickerProps) => {
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const handleCounterClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  useEffect(() => {
    if (data.length === 1 && !filterString) {
      setActiveCounter(data[0].organizer);
    }
  }, [data, filterString, setActiveCounter]);

  return (
    <Card
      sx={{
        //needs fixed height, for scroll and no overflow
        maxHeight: "calc(100vh - 420px)",
        overflowY: "auto",
      }}
    >
      <CardContent>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children || (
            <>
              <LastCounterData
                lastCounter={lastCounterUsed}
                handleCounterClick={handleCounterClick}
              />
              <CounterPickerData
                data={data}
                filterString={filterString}
                excludeCounter={lastCounterUsed}
                handleCounterClick={handleCounterClick}
              />
            </>
          )}
        </ul>
      </CardContent>
    </Card>
  );

  // TODO port loader from ng app?, Error message?
  return null;
};
