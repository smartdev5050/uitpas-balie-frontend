import { useGetCardSystems } from "@/lib/dataAccess";
import { Card, CardContent, Link } from "@/lib/ui";

export const CounterPicker = () => {
  const { data } = useGetCardSystems();

  return (
    <Card>
      <CardContent>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {data?.data.member?.map((cardSystem) => (
            <li key={cardSystem.id} style={{ marginBottom: 6 }}>
              <Link>{cardSystem.name}</Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
