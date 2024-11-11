'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { Pagi, TabelData, Transaction } from '../../types/transaction'
import axios from 'axios'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const BACKEND_URL = "http://localhost:5000/api/transaction"
const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function TransactionTable() {
  const [paginationValues, setPaginationValues] = useState<Pagi>({
    total: 0,
    page: 1,
    perPage: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(3)
  const [transaction, setTransaction] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${BACKEND_URL}`, {
        params: {
          search: search,
          page: currentPage,
          perPage: 10,
          month: selectedMonthIndex === 0 ? null : selectedMonthIndex
        }
      });
      
      
      const responseData = response.data.data as TabelData;
      setTransaction(responseData.transactions)
      setPaginationValues(responseData.pagination)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [currentPage, selectedMonthIndex])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1)
      } else {
        fetchTransactions()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchTransactions()
  }

  const handleMonthChange = (value: string) => {
    const monthIndex = months.indexOf(value)
    setSelectedMonthIndex(monthIndex)
    setCurrentPage(1)
  }

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Search transactions..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Select 
          value={months[selectedMonthIndex]}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : transaction.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">No transactions found</TableCell>
              </TableRow>
            ) : (
              transaction.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item._id.slice(-6)}</TableCell>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {item.description}
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(item.dateOfSale)}</TableCell>
                  <TableCell>{item.sold ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {(paginationValues.totalPages || 0) > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
              size="default"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (paginationValues.hasPreviousPage) {
                    setCurrentPage(prev => prev - 1)
                  }
                }}
                className={!paginationValues.hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {[...Array(paginationValues.totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                size="default"
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
              size="default"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (paginationValues.hasNextPage) {
                    setCurrentPage(prev => prev + 1)
                  }
                }}
                className={!paginationValues.hasNextPage ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}