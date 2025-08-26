import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableHeader, TableCell } from "./ui/table";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link2Icon } from "lucide-react";

type Lead = {
  _id: string;
  company: string;
  industry: string;
  address: string;
  bbbrating: string;
  companyphone: string;
  website: string;
  score: number;
  linkedin?: string;
  currentemployees?: number;
  createdAt: string;
  country: string;
};

const MAX_SELECTION = 5;
const API_URL = "https://scappiss-app-yur2.vercel.app/api/leads";

const TableScraping: React.FC = () => {
  const [companies, setCompanies] = useState<Lead[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Lead[]>([]);
  const [enrichedCompanies, setEnrichedCompanies] = useState<Lead[]>([]);
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("all");
  const [cityState, setCityState] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [enriched, setEnriched] = useState(false);
  const [industrySuggestions, setIndustrySuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<Lead[]>(API_URL);
        setCompanies(response.data);

        const industries = Array.from(new Set(response.data.map((c) => c.industry))).sort();
        const cities = Array.from(new Set(response.data.map((c) => c.address))).sort();
        setIndustrySuggestions(industries);
        setCitySuggestions(cities);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleFindCompanies = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = companies.filter(
        (c) =>
          c.industry.toLowerCase().includes(industry.toLowerCase()) &&
          (location === "all" || c.country.toLowerCase() === location.toLowerCase()) &&
          c.address.toLowerCase().includes(cityState.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setEnrichedCompanies([]);
      setShowTable(true);
      setSelectedIds([]);
      setEnriched(false);
      setLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setIndustry("");
    setLocation("all");
    setCityState("");
    setFilteredCompanies([]);
    setEnrichedCompanies([]);
    setSelectedIds([]);
    setShowTable(false);
    setEnriched(false);
  };

  const handleCancel = () => {
    setFilteredCompanies([]);
    setEnrichedCompanies([]);
    setSelectedIds([]);
    setShowTable(false);
    setEnriched(false);
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else if (selectedIds.length < MAX_SELECTION) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleEnrich = async () => {
    setEnriching(true);
    setTimeout(async () => {
      const enrichedData = await Promise.all(
        filteredCompanies
          .filter((c) => selectedIds.includes(c._id))
          .map(async (c) => ({
            ...c,
            // Enrichment logic tambahan bisa ditaruh di sini
            linkedin: c.linkedin || "https://linkedin.com/company/example",
            currentemployees: c.currentemployees ?? Math.floor(Math.random() * 1000),
          }))
      );
      setEnrichedCompanies(enrichedData);
      setSelectedIds([]);
      setEnriched(true);
      setEnriching(false);
    }, 1000);
  };

  const toUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const dataToRender = enriched ? enrichedCompanies : filteredCompanies;

  return (
    <div className="flex flex-col items-center m-4 gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Company Finder</h1>
        <p className="text-gray-600 mt-1">Find Companies by Industry and Location</p>
      </div>

      {/* Search Card */}
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <h2 className="text-lg font-bold">Search Criteria</h2>
          <p className="text-gray-600">Enter Industry and Location to Find Companies</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Input
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              list="industry-suggestions"
              className="flex-1"
            />
            <datalist id="industry-suggestions">
              {industrySuggestions.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-l">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌐 All</SelectItem>
                <SelectItem value="united states">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="united kingdom">United Kingdom</SelectItem>
                <SelectItem value="france">France</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter City or State"
              value={cityState}
              onChange={(e) => setCityState(e.target.value)}
              list="city-suggestions"
              className="flex-1"
            />
            <datalist id="city-suggestions">
              {citySuggestions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <Button onClick={handleFindCompanies} disabled={loading}>
              {loading ? "Searching..." : "Find Companies"}
            </Button>
            <Button variant="secondary" onClick={handleCancel} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClear} disabled={loading}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      {showTable && (
        <Card className="w-full max-w-6xl overflow-x-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">
                {enriched ? "Enriched Company List" : "Company List"}
              </h2>
              {!enriched && selectedIds.length > 0 && (
                <Button onClick={handleEnrich} disabled={enriching}>
                  {enriching ? "Enriching..." : `Enrich Selected (${selectedIds.length})`}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {dataToRender.length === 0 ? (
              <p className="text-gray-500">No companies found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <tr>
                    {!enriched && <TableCell></TableCell>}
                    <TableCell>Score</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Industry</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>BBB Rating</TableCell>
                    <TableCell>Company Phone</TableCell>
                    <TableCell>Website</TableCell>
                    {enriched && (
                      <>
                        <TableCell>LinkedIn</TableCell>
                        <TableCell>Current Employees</TableCell>
                      </>
                    )}
                  </tr>
                </TableHeader>
                <TableBody>
                  {dataToRender.map((c) => (
                    <tr
                      key={c._id}
                      className={`hover:bg-gray-50 ${selectedIds.includes(c._id) ? "bg-gray-100" : ""}`}
                    >
                      {!enriched && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(c._id)}
                            onChange={() => toggleSelect(c._id)}
                          />
                        </TableCell>
                      )}
                      <TableCell>⭐ {c.score}</TableCell>
                      <TableCell>{toUpperCase(c.company)}</TableCell>
                      <TableCell>{c.industry}</TableCell>
                      <TableCell>{c.address}</TableCell>
                      <TableCell>{c.bbbrating}</TableCell>
                      <TableCell>{c.companyphone}</TableCell>
                      <TableCell className="text-blue-500">
                        <a href={c.website} target="_blank" rel="noopener noreferrer">
                          {c.website} <Link2Icon className="inline-block ml-1" />
                        </a>
                      </TableCell>
                      {enriched && (
                        <>
                          <TableCell>{c.linkedin}</TableCell>
                          <TableCell>{c.currentemployees}</TableCell>
                        </>
                      )}
                    </tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TableScraping;
