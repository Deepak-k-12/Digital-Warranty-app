import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const CardWrapper = ({ title, children, className }) => {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg leading-2 font-medium">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default CardWrapper
