import { useState } from "react";
import {
  CardContainer,
  Card,
  PaginationContainer,
  PageButton,
} from "./CardList.styles";
import type { Operation } from "../../models/Operation";

interface CardListProps {
  data: Operation[];
}

export const CardList = ({ data }: CardListProps) => {
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <CardContainer>
        {paginatedData.map((item) => (
          <Card key={item.id}>
            <div className="card-column">
              <p>
                <strong>Data:</strong> {item.date}
              </p>
              <p>
                <strong>Tipo:</strong> {item.typeOption}
              </p>
            </div>
            <div className="card-column">
              <p>
                <strong>Preço:</strong> R$ {item.unitPrice}
              </p>
              <p>
                <strong>Quantidade:</strong> {item.quantity}
              </p>
            </div>
            <div className="card-column">
              <p>
                <strong>Corretagem:</strong> R$ {item.tradingFee}
              </p>
            </div>
          </Card>
        ))}
      </CardContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </PageButton>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <PageButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
          </PageButton>
        </PaginationContainer>
      )}
    </>
  );
};
