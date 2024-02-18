import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div key="1" className="flex flex-col  min-h-screen w-full overflow-hidden dark:bg-gray-800">

<section className="w-full h-[250px] bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
        <img
          alt="Profile Picture"
          className="object-cover"
          height={128}
          src="/placeholder.svg"
          style={{
            aspectRatio: "128/128",
            objectFit: "cover",
          }}
          width={128}
        />
      </div>
    </section>

      <main className="flex-1 bg-[#1a1c1f] flex flex-col md:flex-row gap-8 p-20">
        
        <div className="flex flex-col gap-8 md:w-1/2">
          
        <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Wallet Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">0x3Dc6...DxE9e</CardContent>
          </Card>
          <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Tokens Earned</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">1,234.56 ETH</CardContent>
          </Card>
          <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>01/01/2024</TableCell>
                    <TableCell>Received</TableCell>
                    <TableCell>500 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>02/01/2024</TableCell>
                    <TableCell>Sent</TableCell>
                    <TableCell>200 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>03/01/2024</TableCell>
                    <TableCell>Received</TableCell>
                    <TableCell>1000 ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-8 md:w-1/2">
        <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Top Earners</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="text-white">
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>10,000 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>Jane Doe</TableCell>
                    <TableCell>9,000 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>Bob Smith</TableCell>
                    <TableCell>8,000 ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Connect with Others</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button className="text-white border-white" variant="outline">
                Subscribe to Channels
              </Button>
              <Button className="text-white border-white" variant="outline">
                Join Communities
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}